import { ManagerModule } from '../../types/Module';
import { DropPuppeteer } from '../../generated/contractLib';
import { PuppeteerConfig } from './types/config';
import { Context } from '../../types/Context';
import pino from 'pino';
import { runQueryRelayer } from '../../utils';

const PuppeteerContractClient = DropPuppeteer.Client;

export class PuppeteerModule implements ManagerModule {
  private contractClient?: InstanceType<typeof PuppeteerContractClient>;

  constructor(
    private context: Context,
    private log: pino.Logger,
  ) {}

  private _config: PuppeteerConfig;
  get config(): PuppeteerConfig {
    return this._config;
  }

  init() {
    this.prepareConfig();

    if (this.config.contractAddress) {
      this.contractClient = new PuppeteerContractClient(
        this.context.neutronSigningClient,
        this.config.contractAddress,
      );
    }
  }

  async run(): Promise<void> {
    if (!this.contractClient) {
      this.init();
    }

    const queryIds = await this.contractClient.queryKVQueryIds();

    this.log.info(`Puppeteer query ids: ${JSON.stringify(queryIds)}`);

    const queryIdsArray = queryIds.map(([queryId]) => queryId.toString());

    this.log.info(
      `Puppeteer query ids plain: ${JSON.stringify(queryIdsArray)}`,
    );

    if (queryIdsArray.length > 0) {
      runQueryRelayer(this.context, this.log, queryIdsArray);
    }
  }

  prepareConfig(): void {
    this._config = {
      contractAddress:
        process.env.PUPPETEER_CONTRACT_ADDRESS ||
        this.context.factoryContractHandler.factoryState.puppeteer_contract,
    };
  }

  static verifyConfig(log: pino.Logger, skipFactory: boolean): boolean {
    if (skipFactory && !process.env.PUPPETEER_CONTRACT_ADDRESS) {
      log.error('PUPPETEER_CONTRACT_ADDRESS is not provided');
      return false;
    }

    return true;
  }
}
