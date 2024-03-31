package chain_client

import (
	"fmt"
	"time"

	"go.uber.org/zap"

	restclient "github.com/hadronlabs-org/neutron-query-relayer/internal/chain_client/querier/client"
	neutrontypes "github.com/neutron-org/neutron/x/interchainqueries/types"
)

// ChainClientConfig contains configurable fields for the ChainClient.
type ChainClientConfig struct {
	// RESTAddress represents the address for REST calls to the chain.
	RESTAddress string
	// Timeout defines time limit for requests executed by the ChainClient.
	Timeout time.Duration
	// ConnectionID is the Neutron's side connection ID used to filter out queries.
	ConnectionID string
}

// NewChainClient creates a new ChainClient instance ready to subscribe to Neutron events.
func NewChainClient(
	cfg *ChainClientConfig,
	logger *zap.Logger,
) (*ChainClient, error) {
	// restClient is used to retrieve registered queries from Neutron.
	restClient, err := newRESTClient(cfg.RESTAddress, cfg.Timeout)
	if err != nil {
		return nil, fmt.Errorf("failed to get newRESTClient: %w", err)
	}

	return &ChainClient{
		restClient: restClient,

		connectionID: cfg.ConnectionID,
		logger:       logger,

		activeQueries: map[string]*neutrontypes.RegisteredQuery{},
	}, nil
}

// ChainClient is responsible for quering chain data.
type ChainClient struct {
	restClient *restclient.HTTPAPIConsole // Used to run Neutron-specific queries using the REST

	connectionID string
	logger       *zap.Logger

	activeQueries map[string]*neutrontypes.RegisteredQuery
}
