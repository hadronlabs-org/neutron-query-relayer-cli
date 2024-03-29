"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proto_signing_1 = require("@cosmjs/proto-signing");
const client_ts_1 = require("@neutron-org/client-ts");
const dotenv_1 = __importDefault(require("dotenv"));
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const pump_1 = require("./modules/pump");
const logger_1 = require("./logger");
const config_1 = require("./config");
dotenv_1.default.config();
class Service {
    context;
    modulesList = [];
    workHandler;
    constructor() {
        process.on('SIGINT', () => {
            console.log('Stopping manager service...');
            clearInterval(this.workHandler);
            process.exit(0);
        });
    }
    async init() {
        logger_1.logger.level = 'debug';
        const log = logger_1.logger.child({ context: 'main' });
        const config = new config_1.Config(log);
        const neutronWallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(config.manager.neutronMnemonic, {
            prefix: 'neutron',
        });
        const targetWallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(config.manager.targetMnemonic, {
            prefix: config.target.accountPrefix,
        });
        const targetTmClient = await tendermint_rpc_1.Tendermint34Client.connect(config.neutron.rpc);
        this.context = {
            log,
            config: config,
            neutronWallet,
            targetWallet,
            neutronQueryClient: new client_ts_1.Client({
                apiURL: config.neutron.rest,
                rpcURL: config.neutron.rpc,
                prefix: 'neutron',
            }),
            neutronClient: await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.neutron.rpc, neutronWallet, {
                gasPrice: config.neutron.gasPrice,
            }),
            targetClient: await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.target.rpc, targetWallet, {
                gasPrice: config.target.gasPrice,
            }),
            targetTmClient,
            targetQueryClient: stargate_1.QueryClient.withExtensions(targetTmClient, stargate_1.setupStakingExtension, stargate_1.setupBankExtension),
        };
    }
    registerModules() {
        this.modulesList.push(new pump_1.PumpModule(this.context));
    }
    async start() {
        await this.performWork();
        this.workHandler = setInterval(() => this.performWork(), 5 * 1000);
    }
    async performWork() {
        for (const module of this.modulesList) {
            await module.run();
        }
    }
}
async function main() {
    const service = new Service();
    await service.init();
    service.registerModules();
    await service.start();
}
main();
