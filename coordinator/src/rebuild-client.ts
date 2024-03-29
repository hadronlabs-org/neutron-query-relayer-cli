import { generate } from '@neutron-org/contracts2ts';

generate({
  src: '../../drop-contracts',
  out: './src/generated/contractLib',
});
