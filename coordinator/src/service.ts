import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { Client as NeutronClient } from '@neutron-org/client-ts';
import { ManagerModule } from './types/Module';
import dotenv from 'dotenv';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import {
  QueryClient,
  setupBankExtension,
  setupStakingExtension,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { PumpModule } from './modules/pump';
import { logger } from './logger';
import { Config } from './config';
import { Context } from './types/Context';
import pino from 'pino';
import { CoreModule } from './modules/core';
import { DropFactory } from './generated/contractLib';
import { FactoryContractHandler } from './factoryContract';
import { ValidatorsStatsModule } from './modules/validators-stats';

export type Uint128 = string;

dotenv.config();

class Service {
  private context: Context;
  private modulesList: ManagerModule[] = [];
  private workHandler: NodeJS.Timeout;
  private log: pino.Logger;

  constructor() {
    logger.level = 'debug';
    this.log = logger.child({ context: 'main' });

    process.on('SIGINT', () => {
      this.log.info('Stopping manager service...');
      clearInterval(this.workHandler);

      process.exit(0);
    });
  }

  async init() {
    const config = new Config(this.log);
    const neutronWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      config.coordinator.mnemonic,
      {
        prefix: 'neutron',
      },
    );
    const targetWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      config.coordinator.mnemonic,
      {
        prefix: config.target.accountPrefix,
      },
    );
    const targetTmClient = await Tendermint34Client.connect(config.target.rpc);
    const neutronTmClient = await Tendermint34Client.connect(
      config.neutron.rpc,
    );

    const neutronSigningClient = await SigningCosmWasmClient.connectWithSigner(
      config.neutron.rpc,
      neutronWallet,
      {
        gasPrice: config.neutron.gasPrice,
      },
    );

    const factoryContractHandler = new FactoryContractHandler(
      neutronSigningClient,
      config.coordinator.factoryContractAddress,
    );

    this.context = {
      config: config,
      neutronWallet,
      factoryContractHandler,
      neutronWalletAddress: (await neutronWallet.getAccounts())[0].address,
      targetWallet,
      targetWalletAddress: (await targetWallet.getAccounts())[0].address,
      neutronTmClient,
      neutronQueryClient: QueryClient.withExtensions(
        neutronTmClient,
        setupBankExtension,
      ),
      neutronClient: new NeutronClient({
        apiURL: config.neutron.rest,
        rpcURL: config.neutron.rpc,
        prefix: 'neutron',
      }),
      neutronSigningClient,
      targetSigningClient: await SigningCosmWasmClient.connectWithSigner(
        config.target.rpc,
        targetWallet,
        {
          gasPrice: config.target.gasPrice,
        },
      ),
      targetTmClient,
      targetQueryClient: QueryClient.withExtensions(
        targetTmClient,
        setupStakingExtension,
        setupBankExtension,
      ),
    };
  }

  async registerModules() {
    this.modulesList.push(
      // new PumpModule(this.context, logger.child({ context: 'PumpModule' })),
      // new CoreModule(this.context, logger.child({ context: 'CoreModule' })),
      new ValidatorsStatsModule(
        this.context,
        logger.child({ context: 'ValidatorsStatsModule' }),
      ),
    );

    await this.context.factoryContractHandler.connect(this.modulesList);
  }

  start() {
    this.workHandler = setInterval(() => this.performWork(), 5 * 1000);
  }

  async showStats() {
    const balance = await this.context.neutronQueryClient.bank.balance(
      this.context.neutronWalletAddress,
      'untrn',
    );

    this.log.info(
      `Coordinator address state: ${balance.amount}${balance.denom}`,
    );
  }

  async performWork() {
    console.log('Performing work...');
    await this.showStats();
    if (
      !this.context.factoryContractHandler.skip &&
      !this.context.factoryContractHandler.connected
    ) {
      this.context.factoryContractHandler.connect(this.modulesList);
    }
    for (const module of this.modulesList) {
      await module.run();
    }
  }

  private async fetchFactoryState(
    client: SigningCosmWasmClient,
    factoryContractAddress: string,
  ) {
    const factoryContractClient = new DropFactory.Client(
      client,
      factoryContractAddress,
    );
    return await factoryContractClient.queryState();
  }
}

async function main() {
  const service = new Service();
  await service.init();
  await service.registerModules();
  // await sleep(5_000);
  service.start();
}

main();
