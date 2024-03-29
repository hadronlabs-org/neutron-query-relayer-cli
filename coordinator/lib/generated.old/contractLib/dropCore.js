"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
function isSigningCosmWasmClient(client) {
    return 'execute' in client;
}
class Client {
    client;
    contractAddress;
    constructor(client, contractAddress) {
        this.client = client;
        this.contractAddress = contractAddress;
    }
    mustBeSigningClient() {
        return new Error('This client is not a SigningCosmWasmClient');
    }
    static async instantiate(client, sender, codeId, initMsg, label, initCoins, fees) {
        const res = await client.instantiate(sender, codeId, initMsg, label, fees, {
            ...(initCoins && initCoins.length && { funds: initCoins }),
        });
        return res;
    }
    queryConfig = async () => this.client.queryContractSmart(this.contractAddress, { config: {} });
    queryOwner = async () => this.client.queryContractSmart(this.contractAddress, { owner: {} });
    queryExchangeRate = async () => this.client.queryContractSmart(this.contractAddress, {
        exchange_rate: {},
    });
    queryUnbondBatch = async (args) => this.client.queryContractSmart(this.contractAddress, {
        unbond_batch: args,
    });
    queryContractState = async () => this.client.queryContractSmart(this.contractAddress, {
        contract_state: {},
    });
    queryLastPuppeteerResponse = async () => this.client.queryContractSmart(this.contractAddress, {
        last_puppeteer_response: {},
    });
    queryNonNativeRewardsReceivers = async () => this.client.queryContractSmart(this.contractAddress, {
        non_native_rewards_receivers: {},
    });
    queryPendingLSMShares = async () => this.client.queryContractSmart(this.contractAddress, {
        pending_l_s_m_shares: {},
    });
    queryLSMSharesToRedeem = async () => this.client.queryContractSmart(this.contractAddress, {
        l_s_m_shares_to_redeem: {},
    });
    queryTotalBonded = async () => this.client.queryContractSmart(this.contractAddress, {
        total_bonded: {},
    });
    bond = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { bond: args }, fee || 'auto', memo, funds);
    };
    unbond = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { unbond: {} }, fee || 'auto', memo, funds);
    };
    updateConfig = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || 'auto', memo, funds);
    };
    updateNonNativeRewardsReceivers = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_non_native_rewards_receivers: args }, fee || 'auto', memo, funds);
    };
    tick = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { tick: {} }, fee || 'auto', memo, funds);
    };
    puppeteerHook = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { puppeteer_hook: args }, fee || 'auto', memo, funds);
    };
    resetBondedAmount = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { reset_bonded_amount: {} }, fee || 'auto', memo, funds);
    };
    updateOwnership = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_ownership: args }, fee || 'auto', memo, funds);
    };
}
exports.Client = Client;
