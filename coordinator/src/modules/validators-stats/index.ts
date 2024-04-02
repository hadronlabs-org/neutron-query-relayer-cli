import { ManagerModule } from '../../types/Module';
import { DropValidatorsStats } from '../../generated/contractLib';
import { ValidatorsStatsConfig } from './types/config';
import { Context } from '../../types/Context';
import pino from 'pino';
import { env } from 'process';
import { QueryIds } from '../../generated/contractLib/dropValidatorsStats';
import { runQueryRelayer } from '../../utils';

const ValidatorsStatsContractClient = DropValidatorsStats.Client;

export class ValidatorsStatsModule implements ManagerModule {
  private contractClient?: InstanceType<typeof ValidatorsStatsContractClient>;

  constructor(
    private context: Context,
    private log: pino.Logger,
  ) {
    this.prepareConfig();
    this.contractClient = new DropValidatorsStats.Client(
      this.context.neutronSigningClient,
      this.config.contractAddress,
    );
  }

  private _config: ValidatorsStatsConfig;
  get config(): ValidatorsStatsConfig {
    return this._config;
  }

  async run(): Promise<void> {
    let queryIds: QueryIds;
    try {
      queryIds = await this.contractClient.queryQueryIds();
    } catch (error) {
      this.log.error(`Error querying contract query ids: ${error.message}`);
      return;
    }

    this.log.info(`Validator stats query ids: ${JSON.stringify(queryIds)}`);

    const queryIdsArray = Object.values(queryIds).filter((id) => !!id);

    runQueryRelayer(this.context, this.log, queryIdsArray);
  }

  prepareConfig(): ValidatorsStatsConfig {
    this._config = {
      contractAddress: env.VALIDATOR_STATS_CONTRACT_ADDRESS,
    };

    return this.config;
  }

  onFactoryConnected(): Promise<void> {
    return Promise.resolve();
  }
}
