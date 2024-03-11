package config

import (
	"fmt"
	"time"

	"github.com/kelseyhightower/envconfig"
)

// NeutronQueryRelayerConfig describes configuration of the app
type NeutronQueryRelayerConfig struct {
	NeutronChain     *NeutronChainConfig `split_words:"true"`
	TargetChain      *TargetChainConfig  `split_words:"true"`
	AllowKVCallbacks bool                `required:"true" split_words:"true"`
	StoragePath      string              `required:"true" split_words:"true"`
}

const EnvPrefix string = "RELAYER"

type NeutronChainConfig struct {
	RPCAddr        string        `required:"true" split_words:"true"`
	RESTAddr       string        `required:"true" split_words:"true"`
	HomeDir        string        `required:"true" split_words:"true"`
	SignKeyName    string        `required:"true" split_words:"true"`
	Timeout        time.Duration `split_words:"true" default:"10s"`
	GasPrices      string        `required:"true" split_words:"true"`
	GasLimit       uint64        `split_words:"true" default:"0"`
	GasAdjustment  float64       `required:"true" split_words:"true"`
	ConnectionID   string        `required:"true" split_words:"true"`
	Debug          bool          `split_words:"true" default:"false"`
	KeyringBackend string        `required:"true" split_words:"true"`
	OutputFormat   string        `split_words:"true" default:"json"`
	SignModeStr    string        `split_words:"true" default:"direct"`
}

type TargetChainConfig struct {
	RPCAddr      string        `required:"true" split_words:"true"`
	Timeout      time.Duration `split_words:"true" default:"10s"`
	Debug        bool          `split_words:"true" default:"false"`
	OutputFormat string        `split_words:"true" default:"json"`
}

func NewNeutronQueryRelayerConfig() (NeutronQueryRelayerConfig, error) {
	var cfg NeutronQueryRelayerConfig

	err := envconfig.Process(EnvPrefix, &cfg)
	if err != nil {
		return cfg, fmt.Errorf("could not read config from env: %w", err)
	}

	return cfg, nil
}
