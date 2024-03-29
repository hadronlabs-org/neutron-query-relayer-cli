FROM golang:1.21-bullseye as builder
ARG LDFLAGS
RUN mkdir /app
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -ldflags "${LDFLAGS}" -a -o build/neutron_query_relayer ./cmd/neutron_query_relayer/*.go

FROM node:lts-alpine3.19
ADD ["https://github.com/CosmWasm/wasmvm/releases/download/v1.5.2/libwasmvm.x86_64.so","https://github.com/CosmWasm/wasmvm/releases/download/v1.5.2/libwasmvm.aarch64.so","/lib/"]
ADD run.sh .
COPY --from=builder /app/build/neutron_query_relayer /bin/
RUN mkdir /coordinator
COPY --from=builder /app/coordinator /coordinator/
WORKDIR /coordinator
RUN yarn

ENTRYPOINT ["yarn", "dev"]
