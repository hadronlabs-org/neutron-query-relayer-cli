import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { Client as NeutronClient } from '@neutron-org/client-ts';
import { ManagerModule } from './types/module';
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
import { Context } from './types/context';
import pino from 'pino';
import { CoreModule } from './modules/core';

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
      config.manager.neutronMnemonic,
      {
        prefix: 'neutron',
      },
    );
    const targetWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      config.manager.targetMnemonic,
      {
        prefix: config.target.accountPrefix,
      },
    );
    const targetTmClient = await Tendermint34Client.connect(config.target.rpc);
    const neutronTmClient = await Tendermint34Client.connect(
      config.neutron.rpc,
    );

    this.context = {
      config: config,
      neutronWallet,
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
      neutronSigningClient: await SigningCosmWasmClient.connectWithSigner(
        config.neutron.rpc,
        neutronWallet,
        {
          gasPrice: config.neutron.gasPrice,
        },
      ),
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

  registerModules() {
    this.modulesList.push(
      // new PumpModule(this.context, logger.child({ context: 'PumpModule' })),
      new CoreModule(this.context, logger.child({ context: 'CoreModule' })),
    );
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
    await this.showStats();
    for (const module of this.modulesList) {
      await module.run();
    }
  }
}

async function main() {
  const service = new Service();
  await service.init();
  service.registerModules();
  // await sleep(5_000);
  service.start();
}

main();
