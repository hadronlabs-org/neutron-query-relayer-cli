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
    queryOwnerOf = async (args) => this.client.queryContractSmart(this.contractAddress, {
        owner_of: args,
    });
    queryApproval = async (args) => this.client.queryContractSmart(this.contractAddress, {
        approval: args,
    });
    queryApprovals = async (args) => this.client.queryContractSmart(this.contractAddress, {
        approvals: args,
    });
    queryOperator = async (args) => this.client.queryContractSmart(this.contractAddress, {
        operator: args,
    });
    queryAllOperators = async (args) => this.client.queryContractSmart(this.contractAddress, {
        all_operators: args,
    });
    queryNumTokens = async () => this.client.queryContractSmart(this.contractAddress, {
        num_tokens: {},
    });
    queryContractInfo = async () => this.client.queryContractSmart(this.contractAddress, {
        contract_info: {},
    });
    queryNftInfo = async (args) => this.client.queryContractSmart(this.contractAddress, {
        nft_info: args,
    });
    queryAllNftInfo = async (args) => this.client.queryContractSmart(this.contractAddress, {
        all_nft_info: args,
    });
    queryTokens = async (args) => this.client.queryContractSmart(this.contractAddress, {
        tokens: args,
    });
    queryAllTokens = async (args) => this.client.queryContractSmart(this.contractAddress, {
        all_tokens: args,
    });
    queryMinter = async () => this.client.queryContractSmart(this.contractAddress, { minter: {} });
    queryExtension = async (args) => this.client.queryContractSmart(this.contractAddress, {
        extension: args,
    });
    queryOwnership = async () => this.client.queryContractSmart(this.contractAddress, {
        ownership: {},
    });
    transferNft = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { transfer_nft: args }, fee || 'auto', memo, funds);
    };
    sendNft = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { send_nft: args }, fee || 'auto', memo, funds);
    };
    approve = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { approve: args }, fee || 'auto', memo, funds);
    };
    revoke = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { revoke: args }, fee || 'auto', memo, funds);
    };
    approveAll = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { approve_all: args }, fee || 'auto', memo, funds);
    };
    revokeAll = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { revoke_all: args }, fee || 'auto', memo, funds);
    };
    mint = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { mint: args }, fee || 'auto', memo, funds);
    };
    burn = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { burn: args }, fee || 'auto', memo, funds);
    };
    extension = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { extension: args }, fee || 'auto', memo, funds);
    };
    updateOwnership = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_ownership: args }, fee || 'auto', memo, funds);
    };
}
exports.Client = Client;
