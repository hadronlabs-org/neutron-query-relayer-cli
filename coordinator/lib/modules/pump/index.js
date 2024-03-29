"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumpModule = void 0;
const contractLib_1 = require("../../generated/contractLib");
const PumpContractClient = contractLib_1.DropPump.Client;
class PumpModule {
    context;
    contractClient;
    icaAddress;
    constructor(context) {
        this.context = context;
        this.prepareConfig();
        this.contractClient = new contractLib_1.DropPump.Client(this.context.neutronClient, this.config.contractAddress);
        this.contractClient.queryIca().then((result) => {
            if (result.ica_address) {
                this.icaAddress = result.ica_address;
            }
            else {
                throw new Error('ICA address not found');
            }
        });
    }
    _config;
    get config() {
        return this._config;
    }
    async run() {
        console.log('PumpModule is running');
        const balance = await this.context.targetQueryClient.bank.balance(this.icaAddress, this.context.config.target.denom);
        console.log('ICA balance:', balance);
    }
    prepareConfig() {
        this._config = {
            contractAddress: process.env.PUMP_CONTRACT_ADDRESS,
        };
        return this.config;
    }
}
exports.PumpModule = PumpModule;
