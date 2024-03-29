"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const stargate_1 = require("@cosmjs/stargate");
class Config {
    logContext;
    manager;
    neutron;
    target;
    relayer;
    modules;
    constructor(logContext) {
        this.logContext = logContext;
        this.load();
    }
    load() {
        this.manager = {
            neutronMnemonic: process.env.MANAGER_NEUTRON_MNEMONIC,
            targetMnemonic: process.env.MANAGER_TARGET_MNEMONIC,
        };
        this.neutron = {
            rpc: process.env.RELAYER_NEUTRON_CHAIN_RPC_ADDR,
            rest: process.env.RELAYER_NEUTRON_CHAIN_REST_ADDR,
            gasPrice: stargate_1.GasPrice.fromString(process.env.RELAYER_NEUTRON_CHAIN_GAS_PRICES),
            gasAdjustment: process.env.NEUTRON_GAS_ADJUSTMENT,
        };
        this.target = {
            rpc: process.env.RELAYER_TARGET_CHAIN_RPC_ADDR,
            rest: process.env.RELAYER_TARGET_CHAIN_REST_ADDR,
            denom: process.env.RELAYER_TARGET_CHAIN_DENOM,
            gasPrice: stargate_1.GasPrice.fromString(process.env.RELAYER_TARGET_CHAIN_GAS_PRICES),
            accountPrefix: process.env.RELAYER_TARGET_CHAIN_ACCOUNT_PREFIX,
            validatorAccountPrefix: process.env.RELAYER_TARGET_CHAIN_VALIDATOR_ACCOUNT_PREFIX,
        };
        this.relayer = {
            neutronMnemonic: process.env.RELAYER_NEUTRON_MNEMONIC,
            neutronSignKeyName: process.env.RELAYER_NEUTRON_SIGN_KEY_NAME,
            neutronGasPrices: process.env.RELAYER_NEUTRON_GAS_PRICES,
            neutronConnectionId: process.env.RELAYER_NEUTRON_CONNECTION_ID,
            neutronChainDebug: process.env.RELAYER_NEUTRON_CHAIN_DEBUG === 'true',
            targetChainDebug: process.env.RELAYER_TARGET_CHAIN_DEBUG === 'true',
            targetMnemonic: process.env.RELAYER_TARGET_MNEMONIC,
            allowKvCallbacks: process.env.RELAYER_ALLOW_KV_CALLBACKS === 'true',
        };
        this.modules = {
            pump: {
                contractAddress: process.env.PUMP_CONTRACT_ADDRESS,
            },
        };
        this.logContext.info('Config loaded');
    }
}
exports.Config = Config;
