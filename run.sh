#!/bin/sh
NODE=${NODE:-node}
echo "Waiting for a first block..."
while ! curl -f ${NODE}:1317/cosmos/base/tendermint/v1beta1/blocks/1 >/dev/null 2>&1; do
  sleep 1
done
echo "Start relayer coordinator"
while true; do
  echo "Working..."
  sleep 5
done

#cd /coordinator
#yarn dev
