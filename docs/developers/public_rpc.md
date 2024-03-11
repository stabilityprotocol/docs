---
sidebar_position: 7
---

# Public RPC

## What is the Stability RPC?

The Stability RPC allows applications to connect to a Stability node that is part of the Stability Blockchain Network. Users can interact with on-chain data by using endpoints provided by this API, or through a UI that uses these endpoints as its backend. The API follows a JSON-RPC standard with a uniform set of methods agnostic of custom applications or nodes, that is lightweight and stateless remote procedure call using JSON as its data format (RFC 4627).

The Stability JSON RPC API supports familiar Ethereum/Geth-compatible endpoints in addition to Stability-custom endpoints that have functionality specialized to our ecosystem.

[Ethereum API Documentation](https://ethereum.github.io/execution-apis/api-documentation/)

## EVM RPC Endpoints

### Stability Testnet

The Stability Public Testnet RPC allows for reading the blockchain, and for 20 daily transactions per an address to be executed. 
Users wishing to execute more daily transactions are welcome to sign up for a free API key. To sign up for a free API Key, go to our [Getting Started page](./getting_started)

- RPC URL: **https://free.testnet.stabilityprotocol.com**
- Chain ID: **20180427**

The Global Trust Network (GTN) Public RPC allows for reading the blockchain. Users cannot execute transactions using the GTN Public RPC.
Users wishing to execute transactions are welcome to sign up for a free API key. To sign up for a free API Key, go to our [Getting Started page](./getting_started)

### Global Trust Network Mainnet

- RPC URL: **https://gtn.stabilityprotocol.com**
- Chain ID: **101010**

## Stability Custom RPC Endpoints

Both networks contain a set of custom RPC points created by the Stability Team.

> `stability_getValidatorList`

Obtain the current validator set, returning the current validator addresses approved to maintain the network.

#

> `stability_getActiveValidatorList`

Obtain the current active validator set, returning the current validator addresses actively maintaining the network.

#

> `stability_getSupportedTokens`

Fetch a list of network-supported tokens. This feature is experimental. This allows for a future use case where network-supported tokens can potentially be used for transaction payments.

#

> `stability_sendSponsoredTransaction`

Submit a transaction that is sponsored to the network's mempool, facilitating transactions without direct fee payment by the sender. This feature is experimental. This allows for a future use case where a user submits a transaction, and a sponsor wallet can execute the transaction.

## Example

```shell
$ curl 'https://free.testnet.stabilityprotocol.com/' \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"stability_getSupportedTokens","params":[], "id":1,"jsonrpc":"2.0"}'


{"jsonrpc":"2.0","result":{"code":200,"value":["0xdc2b93f3291030f3f7a6d9363ac37757f7ad5c43"]},"id":1}
```

This snippet demonstrates how to query the supported tokens using the stability_getSupportedTokens endpoint.
