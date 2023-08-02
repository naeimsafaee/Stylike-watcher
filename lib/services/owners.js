const Web3 = require("web3");
const config = require("config");
const nftAbi = require("../data/erc721.json");

const provider = new Web3.providers.WebsocketProvider(config.get("RPC.BSC"));
const web3 = new Web3(provider);

const stylContract = new web3.eth.Contract(nftAbi, config.get("CONTRACT.STYLIKE"));
/*
console.log("Start");

var subscription = web3.eth.subscribe('logs', {
    address: config.get("CONTRACT.STYLIKE"),
}, function (error, result) {
    if (!error)
        console.log(result);
}).on("data", function (log) {
    console.log({log: log});
});*/

exports.ownerOf = async (req, res) => {

    const {tokenId} = req.body;

    try{
        const ownerAddress = await stylContract.methods.ownerOf(tokenId).call();

        return res.send({
            address: ownerAddress
        });
    }catch (e){
        console.log(e)
        return res.status(400).send({
            message: "Please try again later"
        })
    }

}