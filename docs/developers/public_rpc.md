---
sidebar_position: 8
---

# Public RPC Guide

## Introduction to Stability RPC

The Stability RPC is a critical component that allows applications to connect with a Stability node within the Stability Blockchain Network. It enables users to access on-chain data through specific endpoints or via a user interface that employs these endpoints as its backend. Adhering to the JSON-RPC standard, it offers a consistent method set that is independent of specific applications or nodes, ensuring a lightweight and stateless interaction using JSON (RFC 4627).

In addition to supporting standard Ethereum/Geth-compatible endpoints, the Stability JSON RPC API also includes custom endpoints tailored to the unique needs of our ecosystem.

For Ethereum API specifics, refer to the [Ethereum API Documentation](https://ethereum.github.io/execution-apis/api-documentation/). Note that STABILITY does not support `eth_blobBaseFee` at this time.

## EVM RPC Endpoints

### Stability Testnet Access

The Stability Public Testnet RPC is read-only for the blockchain. Users looking to perform transactions should acquire a free API key as detailed on our [Getting Started page](./getting_started).

- **RPC URL**: `https://rpc.testnet.stabilityprotocol.com/`
- **Chain ID**: `20180427`
- **Request Limit**: `200 per minute`
- **Maximum Batch Size**: `40`

### Global Trust Network Mainnet Access

The Global Trust Network (GTN) Public RPC is read-only for the blockchain. Transaction execution is not available through the GTN Public RPC. Users looking to perform transactions should acquire a free API key as detailed on our [Getting Started page](./getting_started).

- **RPC URL**: `https://rpc.stabilityprotocol.com`
- **Chain ID**: `101010`
- **Request Limit**: `200 per minute`
- **Maximum Batch Size**: `40`

## Stability Custom RPC Endpoints

Our networks feature a suite of custom RPC endpoints developed by the Stability Team to enhance our ecosystem's functionality:

- **`stability_getValidatorList`**: Retrieves the current validator set, listing the addresses authorized to maintain the network.

- **`stability_getActiveValidatorList`**: Fetches the current active validator set, listing the addresses actively involved in network maintenance.

- **`stability_getSupportedTokens`**: Provides a list of tokens supported by the network. This experimental feature paves the way for future transaction payment options with network-supported tokens.

- **`stability_sendSponsoredTransaction`**: Enables the submission of sponsored transactions to the network's mempool, allowing transactions without the sender directly paying the fee. This experimental feature introduces a scenario where transactions are submitted by users and executed by sponsor wallets.

## Usage Example

The following command illustrates how to query the supported tokens using the `stability_getSupportedTokens` endpoint:

```shell
curl 'https://rpc.testnet.stabilityprotocol.com/' \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"stability_getSupportedTokens","params":[], "id":1,"jsonrpc":"2.0"}'

{"jsonrpc":"2.0","result":{"code":200,"value":["0xdc2b93f3291030f3f7a6d9363ac37757f7ad5c43"]},"id":1}
```

