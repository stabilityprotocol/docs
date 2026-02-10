---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API Reference

## ZKT OpenAPI Specification

Click [here](https://stabilityprotocol.github.io/stability-api-docs/) to go to our OpenAPI documentation site for the Zero-Knowledge Transactions (ZKT) API. This includes the request schemas (V1 and V2), response objects (success or error), error fields and an OpenAPI YAML download link.

### How to Use the Specification

- You can copy the **OpenAPI YAML** above into a file named `openapi.yaml` (or similar).
- This specification is compatible with tools like Swagger UI, Redoc, or any OpenAPI v3.0.3-compatible library.
- It documents how to submit V1 and V2 style transactions, along with the standardized success and error response formats.

---

## Request Types

:::tip Select a Tab Below
ZKT supports three different request types. **Use the tabs below** to toggle between them:

:::

<Tabs>
  <TabItem value="v1" label="📝 ZktV1 - Simple Messages" default>

## ZktV1: Write Message to Blockchain

Use ZktV1 to post simple messages to the blockchain without interacting with smart contracts.

---
## Parameters
<Tabs>
  <TabItem value="request" label="Request Parameters" default>

<div style={{width: '100%', overflowX: 'auto'}}>

| Field       | Type   | Description                             | Required |
|-------------|--------|-----------------------------------------|----------|
| `arguments` | string | The message you want to post to the blockchain | Yes      |

</div>

  </TabItem>
  
  <TabItem value="response" label="Response Parameters">

<div style={{width: '100%', overflowX: 'auto'}}>

| Field       | Type    | Description                                                      |
|-------------|---------|------------------------------------------------------------------|
| `success`   | boolean | A boolean indicating whether the request was successful.          |
| `hash`      | string  | The transaction hash of the submitted message on the blockchain. |

</div>

  </TabItem>
</Tabs>

---

## Request Example

<Tabs groupId="os">
  <TabItem value="unix" label="Linux/macOS">

```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" \
-H "Content-Type: application/json" \
--data '{ "arguments": "Your message here" }'
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" -H "Content-Type: application/json" --data "{ \"arguments\": \"Your message here\" }"
```

  </TabItem>
</Tabs>

Response:

```json
{
  "success": true,
  "hash": "0x48b3861c7e04e82fd7bfcec4a1e370950abb65851b6a676515bbc8bee01b470d"
}
```

  </TabItem>
  
  <TabItem value="v2simple" label="🔗 ZktV2Simple - Contract Interaction">

## ZktV2Simple: Smart Contract Interaction

Use ZktV2Simple to interact with existing smart contracts on the Stability blockchain. This enables you to:

- **Execute Smart Contract Functions**: Invoke any function defined in a smart contract, whether it's to read current data or write a new state on the blockchain.
- **Custom Transactions**: Craft and send transactions that interact with decentralized applications (dApps) without the need for specialized blockchain development tools.
- **Simplified Interaction Model**: Use standard `HTTP POST` requests to perform actions that would typically require a blockchain client or wallet software.

:::info Need Help with ABIs?
If you're unfamiliar with smart contract ABIs (Application Binary Interfaces), check out the [Solidity documentation](https://docs.soliditylang.org/en/) for guidance on contract interfaces and function signatures. 
:::
---
## Parameters
<Tabs>
  <TabItem value="request" label="Request Parameters" default>

<div style={{width: '100%', overflowX: 'auto'}}>

| Field       | Type    | Description                                                                                            | Required |
|-------------|---------|--------------------------------------------------------------------------------------------------------|----------|
| `abi`       | array   | Array of ABI entries (functions/events) the service needs to encode / decode your call.                | Yes      |
| `to`        | string  | Address of the target smart contract.                                                                  | Yes      |
| `method`    | string  | Name of the contract function to invoke.                                                               | Yes      |
| `arguments` | array   | Array of arguments for `method` (empty array `[]` if none).                                            | Yes      |
| `id`        | string | Optional request identifier for matching responses.                                              | No       |
| `wait`      | boolean | Optional; if `true`, the call blocks until the transaction is mined and a receipt is returned. | No       |

</div>

  </TabItem>
  
  <TabItem value="response" label="Response Parameters">

<div style={{width: '100%', overflowX: 'auto'}}>

| Field              | Type             | Description                                                                    | Appears In      |
|--------------------|------------------|--------------------------------------------------------------------------------|-----------------|
| `success`          | boolean          | Indicates whether the request was successful.                                  | Read, Write     |
| `output`           | string \| array  | Contract read result. Only for read operations.                               | Read            |
| `queueId`          | string           | UUID for polling transaction status. Only for write operations.                | Write           |
| `transactionHash`  | string \| null   | Transaction hash. May be null initially.                                       | Write           |
| `hash`             | string \| null   | Alternative field name for transaction hash. May be null initially.            | Write           |
| `id`               | string | Request ID (echoed from request).                                              | Read, Write     |

</div>

**Note:** Read operations return `output`, while write operations return `queueId` and either `transactionHash` or `hash` (both may be null initially).

  </TabItem>
</Tabs>

---

## Request Examples

<Tabs>
  <TabItem value="read" label="📖 Read Request" default>

This sample request reads the `getFile` function of an example smart contract deployed on Stability Testnet. The smart contract is a simple storage contract that stores a file hash as well as a file name. The following request uses the file hash to retrieve the owner of the file, the file name, and confirmation of the file hash.

<Tabs groupId="os">
  <TabItem value="unix" label="Linux/macOS">

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out \
-H "Content-Type: application/json" \
-d '{
  "abi": [
    "function storeFile(string fileName, bytes32 fileHash)",
    "function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))",
    "event FileStored(address indexed owner, string fileName, bytes32 fileHash)"
  ],
  "to": "0xaDf4a1165737b406aD510045d4562BE30C14C276",
  "method": "getFile",
  "id": 2,
  "arguments": [
    "0x8e21513d95607300128ceb8bd985f87ea157a5e4cb416b070ca02e9689f9c26c"
  ]
}'
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"abi\": [ \"function storeFile(string fileName, bytes32 fileHash)\", \"function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))\", \"event FileStored(address indexed owner, string fileName, bytes32 fileHash)\" ], \"to\": \"0xaDf4a1165737b406aD510045d4562BE30C14C276\", \"method\": \"getFile\", \"id\": 2, \"arguments\": [ \"0x8e21513d95607300128ceb8bd985f87ea157a5e4cb416b070ca02e9689f9c26c\" ] }"
```

  </TabItem>
</Tabs>

**Response:**

```json
{
  "success": true,
  "output": [
    "0xFac55168086cfE3284b5874Ae2738a68eE6710D2",
    "example.txt",
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  ],
  "id": 2
}
```

  </TabItem>
  <TabItem value="write" label="✍️ Write Request">

This sample request uses the `storeFile` function of an example smart contract deployed on Stability Testnet. Change the `arguments` parameter to store your own file.

<Tabs groupId="os">
  <TabItem value="unix" label="Linux/macOS">

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out \
-H "Content-Type: application/json" \
-d '{
  "abi": [
    "function storeFile(string fileName, bytes32 fileHash)",
    "function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))",
    "event FileStored(address indexed owner, string fileName, bytes32 fileHash)"
  ],
  "to": "0xaDf4a1165737b406aD510045d4562BE30C14C276",
  "method": "storeFile",
  "id": 1,
  "arguments": [
    "example.txt",
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  ]
}'
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"abi\": [ \"function storeFile(string fileName, bytes32 fileHash)\", \"function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))\", \"event FileStored(address indexed owner, string fileName, bytes32 fileHash)\" ], \"to\": \"0xaDf4a1165737b406aD510045d4562BE30C14C276\", \"method\": \"storeFile\", \"id\": 1, \"arguments\": [ \"example.txt\", \"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\" ] }"
```

  </TabItem>
</Tabs>

**Response:**

```json
{
  "success": true,
  "queueId": "4aafa29b-763b-41c3-8d5b-8a1ed8d20260",
  "id": 1
}
```

  </TabItem>
</Tabs>

  </TabItem>
  
  <TabItem value="v2contract" label="🚀 ZktV2Contract - Deploy Contract">

## ZktV2Contract: Deploy Smart Contract

Use ZktV2Contract to deploy new smart contracts to the Stability blockchain. This allows you to:

- Deploy Solidity smart contracts without specialized blockchain tools
- Provide constructor arguments for contract initialization
- Receive the deployed contract address and ABI in the response

:::info New to Smart Contracts?
Learn how to write smart contracts in the [Solidity documentation](https://docs.soliditylang.org/en/), or follow our [Deploy Contract Using Remix](../../../tutorials/contract_deploy/deploy_contract_with_remix.md) tutorial to get started with a visual IDE.

_Note: Ensure Your smart contracts meet our [EVM Compatability Requirements](docs/developing_on_stability/web3_developers/evm_compatibility.md)_
:::

---
## Parameters
<Tabs>
  <TabItem value="request" label="Request Parameters" default>

<div style={{width: '100%', overflowX: 'auto'}}>

| Field       | Type   | Description                                                     | Required |
|-------------|--------|-----------------------------------------------------------------|----------|
| `code`      | string | The Solidity source code of the contract you want to deploy.    | Yes      |
| `arguments` | array  | Optional constructor arguments for contract initialization.      | No       |
| `id`        | string | Optional request identifier for matching responses.       | No       |

</div>

  </TabItem>
  
  <TabItem value="response" label="Response Parameters">

<div style={{width: '100%', overflowX: 'auto'}}>

| Field              | Type             | Description                                                        |
|--------------------|------------------|--------------------------------------------------------------------|
| `success`          | boolean          | A boolean indicating whether the deployment was successful. Always `true` for successful responses. |
| `contractAddress`  | string           | The blockchain address where the contract was deployed.            |
| `abi`              | array            | Full ABI JSON array of the deployed contract.                     |
| `hash`             | string           | The transaction hash of the deployment.                            |
| `id`               | string | Request ID (echoed from request).                                 |

</div>

  </TabItem>
</Tabs>

---

## Request Example

This sample request deploys a new smart contract to Stability Testnet. Change the code parameter to your actual Solidity smart contract, and optionally supply constructor arguments via the arguments array if your contract requires them.

<Tabs groupId="os">
  <TabItem value="unix" label="Linux/macOS">

```bash
curl -X POST 'https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out' \
    -H "Content-Type: application/json" \
    --data '{
"code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract GreetingContract {\n    string private greeting;\n    uint256 private value;\n\n    constructor(string memory _greeting, uint256 _initialValue) {\n        greeting = _greeting;\n        value = _initialValue;\n    }\n\n    function getGreeting() external view returns (string memory) {\n        return greeting;\n    }\n\n    function getValue() external view returns (uint256) {\n        return value;\n    }\n\n    function setValue(uint256 _newValue) external {\n        value = _newValue;\n    }\n}",
"arguments": ["Hello, world!", "123"]
}'
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"code\": \"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.0;\\n\\ncontract GreetingContract {\\n    string private greeting;\\n    uint256 private value;\\n\\n    constructor(string memory _greeting, uint256 _initialValue) {\\n        greeting = _greeting;\\n        value = _initialValue;\\n    }\\n\\n    function getGreeting() external view returns (string memory) {\\n        return greeting;\\n    }\\n\\n    function getValue() external view returns (uint256) {\\n        return value;\\n    }\\n\\n    function setValue(uint256 _newValue) external {\\n        value = _newValue;\\n    }\\n}\", \"arguments\": [ \"Hello, world!\", \"123\" ] }"
```

  </TabItem>
</Tabs>

**Response:**

```json
{
  "success": true,
  "contractAddress": "0x983b2221EE0f21E076CD0A12DE484D974bBa2b4E",
  "abi": [
    {
      "inputs": [
        { "internalType": "string", "name": "_greeting", "type": "string" },
        {
          "internalType": "uint256",
          "name": "_initialValue",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getGreeting",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getValue",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "_newValue", "type": "uint256" }
      ],
      "name": "setValue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "hash": "0x7435da85e2af649fbaf6b4e06cb963f502992931217f0b31f91cd1c547619918",
  "id": 1
}
```

  </TabItem>
</Tabs>

---

After submitting a transaction, you may want to check its status. The next section covers how to [monitor your transactions](./transaction_status).
