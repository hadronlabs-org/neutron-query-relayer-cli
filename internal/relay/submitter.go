package relay

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	neutrontypes "github.com/neutron-org/neutron/x/interchainqueries/types"
)

// Submitter knows how to submit proof to the chain
type Submitter interface {
	SubmitKVProof(ctx context.Context, height, revision, queryId uint64, proof []*neutrontypes.StorageValue, updateClientMsg sdk.Msg) error
}
