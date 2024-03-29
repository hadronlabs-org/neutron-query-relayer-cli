import pino from 'pino';
import { GasPrice } from '@cosmjs/stargate';

export class Config {
  manager: {
    neutronMnemonic: string;
    targetMnemonic: string;
    factoryContractAddress: string;
  };
  neutron: {
    rpc: string;
    rest: string;
    gasPrice: GasPrice;
    gasAdjustment: string;
  };
  target: {
    rpc: string;
    rest: string;
    denom: string;
    gasPrice: GasPrice;
    accountPrefix: string;
    validatorAccountPrefix: string;
  };
  relayer: {
    neutronMnemonic: string;
    neutronSignKeyName: string;
    neutronGasPrices: string;
    neutronConnectionId: string;
    neutronChainDebug: boolean;
    targetChainDebug: boolean;
    targetMnemonic: string;
    allowKvCallbacks: boolean;
  };

  constructor(private logContext: pino.Logger) {
    this.load();
  }

  load() {
    this.manager = {
      neutronMnemonic: process.env.MANAGER_NEUTRON_MNEMONIC,
      targetMnemonic: process.env.MANAGER_TARGET_MNEMONIC,
      factoryContractAddress: process.env.FACTORY_CONTRACT_ADDRESS,
    };

    this.neutron = {
      rpc: process.env.RELAYER_NEUTRON_CHAIN_RPC_ADDR,
      rest: process.env.RELAYER_NEUTRON_CHAIN_REST_ADDR,
      gasPrice: GasPrice.fromString(
        process.env.RELAYER_NEUTRON_CHAIN_GAS_PRICES,
      ),
      gasAdjustment: process.env.NEUTRON_GAS_ADJUSTMENT,
    };

    this.target = {
      rpc: process.env.RELAYER_TARGET_CHAIN_RPC_ADDR,
      rest: process.env.RELAYER_TARGET_CHAIN_REST_ADDR,
      denom: process.env.RELAYER_TARGET_CHAIN_DENOM,
      gasPrice: GasPrice.fromString(
        process.env.RELAYER_TARGET_CHAIN_GAS_PRICES,
      ),
      accountPrefix: process.env.RELAYER_TARGET_CHAIN_ACCOUNT_PREFIX,
      validatorAccountPrefix:
        process.env.RELAYER_TARGET_CHAIN_VALIDATOR_ACCOUNT_PREFIX,
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

    this.logContext.info('Config loaded');
  }
}
