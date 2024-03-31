package chain_client

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"time"

	httptransport "github.com/go-openapi/runtime/client"

	restclient "github.com/hadronlabs-org/neutron-query-relayer/internal/chain_client/querier/client"
	"github.com/hadronlabs-org/neutron-query-relayer/internal/chain_client/querier/client/query"
	neutrontypes "github.com/neutron-org/neutron/x/interchainqueries/types"
)

var (
	restClientBasePath = "/"
)

// newRESTClient makes sure that the restAddr is formed correctly and returns a REST query.
func newRESTClient(restAddr string, timeout time.Duration) (*restclient.HTTPAPIConsole, error) {
	url, err := url.Parse(restAddr)
	if err != nil {
		return nil, fmt.Errorf("failed to parse restAddr: %w", err)
	}

	httpClient := http.DefaultClient
	httpClient.Timeout = timeout
	transport := httptransport.NewWithClient(url.Host, restClientBasePath, []string{url.Scheme}, httpClient)

	return restclient.New(transport, nil), nil
}

// getNeutronRegisteredQuery retrieves a registered query from Neutron.
func (s *ChainClient) GetNeutronRegisteredQuery(ctx context.Context, queryId string) (*neutrontypes.RegisteredQuery, error) {
	res, err := s.restClient.Query.NeutronInterchainQueriesRegisteredQuery(
		&query.NeutronInterchainQueriesRegisteredQueryParams{
			QueryID: &queryId,
			Context: ctx,
		},
	)
	if err != nil {
		return nil, fmt.Errorf("failed to get NeutronInterchainqueriesRegisteredQuery: %w", err)
	}
	neutronQuery, err := res.GetPayload().RegisteredQuery.ToNeutronRegisteredQuery()
	if err != nil {
		return nil, fmt.Errorf("failed to get neutronQueryFromRestQuery: %w", err)
	}
	return neutronQuery, nil
}
