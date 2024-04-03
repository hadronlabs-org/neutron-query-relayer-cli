import { ManagerModule } from '../../types/Module';
import { DropCore } from '../../generated/contractLib';
import { CoreConfig } from './types/config';
import { Context } from '../../types/Context';
import pino from 'pino';
import { ContractState } from '../../generated/contractLib/dropCore';

const CoreContractClient = DropCore.Client;

export class CoreModule implements ManagerModule {
  contractClient?: InstanceType<typeof CoreContractClient>;

  constructor(
    private context: Context,
    private log: pino.Logger,
  ) {}

  private _config: CoreConfig;
  get config(): CoreConfig {
    return this._config;
  }

  init() {
    this._config = {
      contractAddress: process.env.CORE_CONTRACT_ADDRESS
        ? process.env.CORE_CONTRACT_ADDRESS
        : this.context.factoryContractHandler.factoryState.core_contract,
    };

    this.contractClient = new DropCore.Client(
      this.context.neutronSigningClient,
      this.config.contractAddress,
    );
    return this.config;
  }

  async run(): Promise<void> {
    if (!this.contractClient) {
      this.init();
    }

    let contractState: ContractState;
    let transferAck: boolean;
    try {
      contractState = await this.contractClient.queryContractState();
      transferAck = await this.contractClient.queryTransferAckReceived();
    } catch (error) {
      this.log.error(`Error querying contract state: ${error.message}`);
      return;
    }

    this.log.info(
      `Core contract state: ${contractState}, transfer ACK received: ${transferAck}`,
    );
  }
}
