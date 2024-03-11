VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/hadronlabs-org/neutron-query-relayer-cli/internal/app.Version=$(VERSION) \
		  -X github.com/hadronlabs-org/neutron-query-relayer-cli/internal/app.Commit=$(COMMIT)

dev: clean
	go run ./cmd/neutron_query_relayer/ run -q $(QUERY_ID)

clean:
	@echo "Removing relayer storage state"
	-@rm -rf ./storage

test:
	 go test ./...

.PHONY: build
build:
	go build -ldflags '$(ldflags)' -a -o build/neutron_query_relayer ./cmd/neutron_query_relayer/*.go

build-docker:
	docker build --build-arg LDFLAGS='$(ldflags)' . -t hadronlabs-org/neutron-query-relayer-cli

generate-openapi:
	@cd ./internal/chain_client/querier ; swagger generate client -f openapi.yml

install:
	go install -ldflags '$(ldflags)' -a ./cmd/neutron_query_relayer
