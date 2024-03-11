package cmd

import (
	"context"
	"fmt"
	"log"

	neutronapp "github.com/neutron-org/neutron/app"

	"github.com/neutron-org/neutron-query-relayer/internal/relay"

	"github.com/spf13/cobra"
	"go.uber.org/zap"

	nlogger "github.com/neutron-org/neutron-logger"
	"github.com/neutron-org/neutron-query-relayer/internal/app"
	"github.com/neutron-org/neutron-query-relayer/internal/config"
)

const (
	mainContext     = "main"
	QueryIdFlagName = "query_id"
)

var queryIds []string

// RunCmd represents the start command
var RunCmd = &cobra.Command{
	Use:   "run",
	Short: "Run the query relayer main app",
	RunE: func(cmd *cobra.Command, args []string) error {
		queryIds, err := cmd.Flags().GetStringSlice(QueryIdFlagName)
		if len(queryIds) == 0 {
			return fmt.Errorf("empty list of query ids to relay")
		}
		if err != nil {
			return err
		}

		return startRelayer(queryIds)
	},
}

func init() {
	RunCmd.PersistentFlags().StringSliceVarP(&queryIds, QueryIdFlagName, "q", []string{}, "list of query ids to relay")
	rootCmd.AddCommand(RunCmd)
}

func startRelayer(queryIds []string) error {
	// set global values for prefixes for cosmos-sdk when parsing addresses and so on
	globalCfg := neutronapp.GetDefaultConfig()
	globalCfg.Seal()

	logRegistry, err := nlogger.NewRegistry(
		mainContext,
		app.AppContext,
		app.ChainClientContext,
		app.RelayerContext,
		app.TargetChainRPCClientContext,
		app.NeutronChainRPCClientContext,
		app.TargetChainProviderContext,
		app.NeutronChainProviderContext,
		app.TxSenderContext,
		app.TrustedHeadersFetcherContext,
		app.KVProcessorContext,
	)
	if err != nil {
		log.Fatalf("couldn't initialize loggers registry: %s", err)
	}
	logger := logRegistry.Get(mainContext)
	logger.Info("neutron-query-relayer starts...")

	cfg, err := config.NewNeutronQueryRelayerConfig()
	if err != nil {
		logger.Fatal("cannot initialize relayer config", zap.Error(err))
		return nil
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	chainClient, err := app.NewDefaultChainClient(cfg, logRegistry)
	if err != nil {
		logger.Fatal("Failed to get NewDefaultSubscriber", zap.Error(err))
		return nil
	}

	deps, err := app.NewDefaultDependencyContainer(ctx, cfg, logRegistry)
	if err != nil {
		logger.Fatal("failed to initialize dependency container", zap.Error(err))
		return nil
	}

	kvprocessor, err := app.NewDefaultKVProcessor(logRegistry, deps)
	if err != nil {
		logger.Fatal("Failed to get NewDefaultKVProcessor", zap.Error(err))
		return nil
	}

	for _, queryId := range queryIds {
		query, err := chainClient.GetNeutronRegisteredQuery(ctx, queryId)
		if err != nil {
			logger.Error("could not getNeutronRegisteredQueries: %w", zap.Error(err))
		}

		msg := &relay.MessageKV{QueryId: query.Id, KVKeys: query.Keys}
		if err = kvprocessor.ProcessAndSubmit(ctx, msg); err != nil {
			logger.Error("unable to process and submit KV query: %w", zap.Error(err))
		}
	}

	return nil
}
