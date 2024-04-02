import { execSync } from 'child_process';
import { Context } from './types/Context';
import pino from 'pino';

export function runQueryRelayer(
  context: Context,
  log: pino.Logger,
  queryIds: string[],
) {
  console.log('runQueryRelayer');
  console.log(queryIds);
  console.log(queryIds.join(' -q '));
  try {
    const stdout = execSync(
      `${context.config.coordinator.icqRunCmd} -q ${queryIds.join(' -q ')}`,
    );
    log.debug(`stdout: ${stdout}`);
  } catch (error) {
    log.error(`Error running query relayer: ${error.message}`);
  }
}
