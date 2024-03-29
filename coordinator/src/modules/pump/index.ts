import { ManagerModule } from '../../types/Module';
import { DropPump } from '../../generated/contractLib';
import { PumpConfig } from './types/pump-config';
import { Context } from '../../types/Context';
import { Uint64 } from '@cosmjs/math';
import pino from 'pino';

const PumpContractClient = DropPump.Client;

export class PumpModule implements ManagerModule {
  contractClient?: InstanceType<typeof PumpContractClient>;
  icaAddress?: string;

  constructor(
    private context: Context,
    private log: pino.Logger,
  ) {
    this.prepareConfig();
    this.contractClient = new DropPump.Client(
      this.context.neutronSigningClient,
      this.config.contractAddress,
    );

    this.contractClient.queryIca().then((result) => {
      console.log('ICA address query:');
      if ((result as any).registered.ica_address) {
        this.icaAddress = (result as any).registered.ica_address;
        this.log.info(`Pump ICA address: ${this.icaAddress}`);
      } else {
        throw new Error('ICA address not found');
      }
    });
  }

  private _config: PumpConfig;
  get config(): PumpConfig {
    return this._config;
  }

  async run(): Promise<void> {
    const balance = await this.context.targetQueryClient.bank.balance(
      this.icaAddress,
      this.context.config.target.denom,
    );

    const balanceAmount = Uint64.fromString(balance.amount);

    if (balanceAmount > this.config.minBalance) {
      this.contractClient.push(
        this.context.neutronWalletAddress,
        {
          coins: [
            {
              amount: balanceAmount.toString(),
              denom: this.context.config.target.denom,
            },
          ],
        },
        1.5,
        undefined,
        [
          {
            amount: '20000',
            denom: 'untrn',
          },
        ],
      );
    }
  }

  prepareConfig(): PumpConfig {
    this._config = {
      contractAddress: process.env.PUMP_CONTRACT_ADDRESS,
      minBalance: Uint64.fromString(process.env.PUMP_MIN_BALANCE),
    };

    return this.config;
  }
}
