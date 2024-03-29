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
    queryGetProposal = async (args) => this.client.queryContractSmart(this.contractAddress, {
        get_proposal: args,
    });
    queryGetProposals = async () => this.client.queryContractSmart(this.contractAddress, {
        get_proposals: {},
    });
    queryMetrics = async () => this.client.queryContractSmart(this.contractAddress, {
        metrics: {},
    });
    updateConfig = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || 'auto', memo, funds);
    };
    updateProposalVotes = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_proposal_votes: args }, fee || 'auto', memo, funds);
    };
}
exports.Client = Client;
