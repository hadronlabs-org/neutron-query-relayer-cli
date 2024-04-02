import pino from 'pino';
import { logger } from './logger';
import { DropFactory } from './generated/contractLib';
import { State } from './generated/contractLib/dropFactory';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { ManagerModule } from './types/Module';

export class FactoryContractHandler {
  private log: pino.Logger;

  constructor(
    private signingClient: SigningCosmWasmClient,
    private factoryContractAddress: string,
  ) {
    this.log = logger.child({ context: 'factoryContract' });
  }

  get skip(): boolean {
    return !this.factoryContractAddress;
  }

  private _connected: boolean = false;
  get connected(): boolean {
    return this._connected;
  }

  private _factoryState: State;
  get factoryState(): State {
    return this._factoryState;
  }

  async connect(modulesList: ManagerModule[]) {
    if (this.skip) {
      this.log.info('Factory contract address not provided, skipping');
      return;
    }
    if (this.connected) {
      return;
    }

    this.log.info('Connecting to factory contract...');

    const factoryContractClient = new DropFactory.Client(
      this.signingClient,
      this.factoryContractAddress,
    );

    try {
      this._factoryState = await factoryContractClient.queryState();
      this._connected = true;
      await this.onConnectNotifyModules(modulesList);
    } catch (e) {
      this.log.error('Unable to query to factory contract state', e);
    }
  }

  async onConnectNotifyModules(modulesList: ManagerModule[]) {
    for (const module of modulesList) {
      await module.onFactoryConnected();
    }
  }
}
