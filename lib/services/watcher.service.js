const config = require("config");
const {postgres} = require("../databases");
const logger = require("../middleware/WinstonErrorMiddleware");
const nftAbi = require("../data/erc721.json");


async function watch(stylContract , web3) {
    console.log("Start watching on styl contract...");

    let setting = await postgres.Settings.findOne({
        where: {
            type: "watcher",
            key: "lastCheckedBlock"
        }
    });
    if (!setting)
        setting = await postgres.Settings.create({
            where: {
                type: "watcher",
                key: "lastCheckedBlock",
                value: config.get("CONTRACT.FIRST_BLOCK")
            }
        }, {returning: true});

    let fromBlock = parseInt(setting.value);
    const latestBlock = await web3.eth.getBlockNumber();
    const blockCountIteration = 5;

    stylContract.events.Transfer({
        fromBlock: latestBlock
    }, async (error, event) => {
        const tokenId = event.returnValues.tokenId;

        logger.error("Transfer received", {tokenId, from: event.returnValues.from, to: event.returnValues.to});
        console.log("Transfer received", {tokenId, from: event.returnValues.from, to: event.returnValues.to})

        await postgres.Owner.create({
            cardEdition: tokenId,
            fromAddress: event.returnValues.from === "0x0000000000000000000000000000000000000000" ? "mint" : event.returnValues.from,
            toAddress: event.returnValues.to,
            txId: event.transactionHash,
            blockNumber: event.blockNumber
        });

        if (event.returnValues.from.toLowerCase() !== '0xdc4c997b592a27dc9366ffbceaa4841c7cf6ff29'.toLowerCase()) {
            const card = await postgres.Card.findOne({
                where: {
                    edition: tokenId
                }
            });

            if (card) {
                const assignedCard = await postgres.AssignedCard.findOne({
                    where: {
                        cardId: card.id
                    }
                });
                if (assignedCard) {
                    await assignedCard.update({
                        userId: null
                    });
                }
            }
        }

    });



    getData(stylContract , fromBlock, latestBlock, blockCountIteration);

}

async function getData(stylContract , fromBlock, latestBlock, blockCountIteration) {
    let toBlock = fromBlock + blockCountIteration;

    if (toBlock > latestBlock)
        return;

    console.log(`start checking from block ${fromBlock} to block ${toBlock} , ${latestBlock}`);

    const events = await stylContract.getPastEvents("Transfer", {
        fromBlock: fromBlock,
        toBlock: toBlock
    }).catch((err) => {
        console.log(err);
    });

    console.log({events});

    let createValues = [];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        const blockChecked = await postgres.Owner.findOne({
            where: {
                blockNumber: event.blockNumber
            }
        });

        if (!blockChecked) {
            createValues.push({
                cardEdition: event.returnValues.tokenId,
                fromAddress: event.returnValues.from === "0x0000000000000000000000000000000000000000" ? "mint" : event.returnValues.from,
                toAddress: event.returnValues.to,
                txId: event.transactionHash,
                blockNumber: event.blockNumber
            });
        }

    }

    await postgres.Owner.bulkCreate(createValues).then(() => {

        fromBlock = toBlock + blockCountIteration;

        if (createValues.length > 0)
            console.log(`updated ${createValues.length} data`);

        postgres.Settings.update({
            value: toBlock
        }, {
            where: {
                type: "watcher",
                key: "lastCheckedBlock"
            }
        }).then(() => {

            setTimeout(() => {
                getData(stylContract , fromBlock, latestBlock, blockCountIteration);
            }, 500);
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });

}

exports.init = async function (web3) {
    const stylContract = new web3.eth.Contract(nftAbi, config.get("CONTRACT.STYLIKE"));

    await watch(stylContract , web3);
};
