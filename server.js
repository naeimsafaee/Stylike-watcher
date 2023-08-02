require("dotenv").config();
const {
    postgres: {sequelize},
} = require("./lib/databases");
const config = require("config");
const serverConfig = config.get("server");

process.on("uncaughtException", (ex) => {
    console.log(ex)
    // throw ex;
});
process.on("unhandledRejection", (ex) => {
    console.log(ex)
    // throw ex;
});

const app = require("./lib/app");
const Web3 = require("web3");
const logger = require("./lib/middleware/WinstonErrorMiddleware");

sequelize
    .sync(config.get("databases.postgres.sync"))
    .then(async () => {
        console.log(`*** POSTGRES Info: Tables are synced!`);

        let server = app.listen(serverConfig.port, () => {
            console.log(`*** SERVER Info: Server is running on port ${serverConfig.port}...`);
        });

        // register db triggers
        require("./lib/databases/postgres/init")().then(() => {

            try {
                const provider = new Web3.providers.WebsocketProvider(config.get("RPC.BSC"));
                const web3 = new Web3(provider);

                require("./lib/services/watcher.service").init(web3);

                require("./lib/services/nft-watcher.service").init(web3);

            } catch (e) {
                logger.error("watcher error", e);
            }

        });

    })
    .catch((e) => {
        console.log(e);

        throw e;
    });
