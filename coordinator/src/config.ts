import pino from 'pino';
import { GasPrice } from '@cosmjs/stargate';

export class Config {
  coordinator: {
    neutronMnemonic: string;
    targetMnemonic: string;
    factoryContractAddress: string;
    icqRunCmd: string;
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

  constructor(private logContext: pino.Logger) {
    this.load();
  }

  load() {
    this.coordinator = {
      neutronMnemonic: process.env.COORDINATOR_NEUTRON_MNEMONIC,
      targetMnemonic: process.env.COORDINATOR_TARGET_MNEMONIC,
      factoryContractAddress: process.env.FACTORY_CONTRACT_ADDRESS,
      icqRunCmd: process.env.ICQ_RUN_COMMAND,
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

    this.logContext.info('Config loaded');
  }
}
