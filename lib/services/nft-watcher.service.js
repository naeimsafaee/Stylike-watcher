const config = require('config');
const qs = require('qs');
const {updateCollectionStats} = require("./stats.service");
const {postgres} = require("../databases");

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const abi = require("../data/abi721.json")

class Handler {

    constructor(web3) {

        this.web3 = web3;

        this.wethContract = new web3.eth.Contract(abi, config.get("contracts.bsc"));
    }

    async init() {

        console.log("Watching on contract : ", config.get("contracts.bsc"))

        let lastCheckedBlockNumber = await postgres.EventBlockNumber.findOne(
            {where: {key: "BLOCK_NUMBER"}},
        );
        const lastBlockNumber = await this.web3.eth.getBlockNumber();

        if (lastCheckedBlockNumber) {
            lastCheckedBlockNumber = parseInt(lastCheckedBlockNumber.value);

            if (lastCheckedBlockNumber < lastBlockNumber) {
                this.getLastBlock(lastCheckedBlockNumber, lastBlockNumber)
            }
        }

        await this.wethContract.events.allEvents({
            fromBlock: lastBlockNumber
        }, async (error, event) => {

            console.log({r: event})

            if (!event)
                return;

            const fromAddress = event.returnValues.from;
            const toAddress = event.returnValues.to;
            const tokenId = event.returnValues.tokenId;

            if (!fromAddress || !toAddress || !tokenId)
                return;

            if (event.event === "Transfer") {
                //MINT or transfer
                if (fromAddress === NULL_ADDRESS) {
                    //MINT
                    await this.Transfer(event);
                } else if (toAddress === NULL_ADDRESS) {
                    //BURN
                    await this.Transfer(event);
                } else {
                    // TRANSFER from one address to another
                    await this.Transfer(event);
                }
            }

        });

    }

    async getLastBlock(fromBlock, toBlock) {
        if (fromBlock > toBlock)
            return;

        console.log(`start checking from block ${fromBlock} to block ${toBlock}`);

        let receipt = await this.wethContract.getPastEvents("Transfer", {
            fromBlock: fromBlock,
            toBlock: fromBlock + 1
        }).catch((err) => {
            console.log(err);
        });

        if (receipt && receipt.length > 0) {
            for (let i = 0; i < receipt.length; i++) {

                const userActivity = await postgres.UserActivity.findOne({where: {blockNumber: receipt[i].blockNumber}});
                if (!userActivity) {
                    await this.Transfer(receipt[i]);
                }
            }
        }
        await postgres.EventBlockNumber.update(
            {value: fromBlock},
            {where: {key: 'BLOCK_NUMBER'}}
        );

        setTimeout(() => {
            this.getLastBlock(++fromBlock, toBlock)
        }, 500)

    }

    Transfer(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let {
                    returnValues: {from, to, tokenId},
                    transactionHash,
                    blockHash,
                    blockNumber,
                } = data;

                console.log("Got " + tokenId)
                console.log("from " + from)
                console.log("to " + to)
                const transaction = await this.web3.eth.getTransaction(transactionHash)

                let ethValue = 0
                if (transaction.value)
                    ethValue = this.web3.utils.fromWei(transaction.value)

                console.log("ethValue = " + ethValue)


                let usertoken = await postgres.UserToken.findOne({where: {serialId: tokenId}});

                if (!usertoken) return resolve();

                let assignedToken,
                    receiver,
                    type = "MINT";

                // mint nft event
                if (from === NULL_ADDRESS) {

                    assignedToken = await postgres.UserAssignedToken.findOne(
                        {where: {tokenId: usertoken.id, status: 'PENDING'}}
                    );

                    if (assignedToken)
                        await assignedToken.update(
                            {status: 'FREE'}
                        );

                    //update collection stats
                    updateCollectionStats(usertoken.collectionId, null, null, null, 1);

                    //save tokens name in explorers table
                    await postgres.UserExplore.create({
                        name: usertoken.name,
                        type: "TOKENS",
                        typeId: usertoken.id,
                        tokenImage: usertoken?.thumbnail?.[0]?.location,
                    });

                } else if (to === NULL_ADDRESS) {

                    // burn nft event
                    type = "BURN";

                    // change token status
                    assignedToken = await this.UpdateTokenStatus(usertoken.id, "BURNED");

                    //update collection stats
                    updateCollectionStats(usertoken.collectionId, null, null, null, -1);

                    // remove token from explorer

                    await postgres.UserExplore.update(
                        {deletedAt: new Date()},
                        {where: {deletedAt: null, type: 'TOKENS', typeId: usertoken.id}}
                    );

                } else {
                    // transfer nft between address
                    type = "TRANSFER";

                    // change token status
                    assignedToken = await this.UpdateTokenStatus(usertoken.id, "TRANSFERRED", usertoken.name, ethValue);

                    receiver = await postgres.User.findOne({where: {marketAddress: to.toLowerCase()}});
                    // check receiver address is exist
                    if (receiver)
                        await receiver.update({marketAddress: to.toLowerCase()});

                    if (usertoken.isLazyMint) {
                        usertoken.isLazyMint = false;
                        await usertoken.save()
                    }

                    // transfer token to new receiver
                    await postgres.UserAssignedToken.create({
                        tokenId: usertoken.id,
                        userId: receiver.id,
                        collectionId: usertoken.collectionId,
                        status: "FREE",
                    });

                    /*await axios({
                        method: 'post',
                        url: config.get("base_url") + 'public/send_notif',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: qs.stringify({
                            userId: receiver.id.toString(),
                            title: 'Purchase',
                            description: `You bought ${usertoken.name} NFT `,
                        })
                    })*/
                    //update collection stats
                    updateCollectionStats(usertoken.collectionId, null, null, 1, null);

                }

                // save this event in user activity
                await postgres.UserActivity.create({
                    from: assignedToken?.userId,
                    to: receiver?.id,
                    type,
                    tokenId: usertoken.id,
                    collectionId: usertoken.collectionId,
                    transactionHash,
                    blockHash,
                    blockNumber,
                });


            } catch (error) {

                console.log("Transfer Error", error);

            } finally {
                resolve();
            }
        });
    }

    UpdateTokenStatus(tokenId, status, name, ethValue) {
        return new Promise(async (resolve, reject) => {
            // change token status
            let assignedToken = await postgres.UserAssignedToken.findOne({
                where: {
                    tokenId,
                    status: {[postgres.Op.in]: ['FREE', 'IN_AUCTION']}
                }
            });

            if (assignedToken) {
                assignedToken.status = status;
                await assignedToken.save();
            }


            const auction = await postgres.UserAuctions.findOne({
                where: {
                    assignTokenId: assignedToken.id,
                    status: 'ACTIVE'
                }
            });

            if (auction) {
                auction.status = 'FINISH';
                auction.deletedAt = new Date();
                await auction.save();
            }

            console.log('user_id = ', assignedToken.userId)

            /*await axios({
                method: 'post',
                url: config.get("base_url") + 'public/send_notif',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    userId: assignedToken.userId.toString(),
                    title: 'Purchase',
                    description: `Your ${name} NFT has been successfully sold `,
                })
            })*/

            return resolve(assignedToken);
        });
    }

}

exports.init = async function (web3) {
    const handler = new Handler(web3);

    handler.init();
};

