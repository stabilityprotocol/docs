---
sidebar_position: 6
---

# Zero-Knowledge Transactions (Beta)

### Overview

Zero-Knowledge Transactions, ZKT, is a feature built on the **Stability Blockchain** that simplifies blockchain interactions by enabling users to submit messages directly to the blockchain via HTTP POST requests. This is an experimental aspect of Stability, aimed at making blockchain interactions as simple as possible.

An open-source GitHub repository, [Stability Publisher](https://github.com/stabilityprotocol/stability-publisher-dapp) is available for exploring this feature. There is a live demo available [here](https://stabilityprotocol.github.io/stability-publisher-dapp/).

To start experimenting, we recommend signing up for a free API Key on the [Stability Portal](https://account.stabilityprotocol.com/keys). A public RPC is available for experimentation, though please note that it may be limited.

- Mainnet: `https://rpc.stabilityprotocol.com/zkt/try-it-out`
- Testnet: `https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out`

### ZKT OpenAPI Specification

Click [here](https://stabilityprotocol.github.io/stability-api-docs/) to go to our OpenAPI documentation site for the Zero-Knowledge Transactions (ZKT) API. This includes the request schemas (V1 and V2), response objects (success or error), and error fields. This link also contains a download link for the specification.

### How to Use the Specification

- You can copy the **OpenAPI YAML** above into a file named `openapi.yaml` (or similar).
- This specification is compatible with tools like Swagger UI, Redoc, or any OpenAPI v3.0.3-compatible library.
- It documents how to submit V1 and V2 style transactions, along with the standardized success and error response formats.

---

**Tip**: If you want to keep a **separate file** for your OpenAPI definition, simply copy the YAML from the code block and store it in your repository (e.g., `docs/zkt-openapi.yaml`). Then you can reference it from your docs or integrate it into your CI/CD pipelines for automatic generation of client libraries, etc.

---

### Architecture Overview

The ZKT solution is designed around a RESTful service that accepts HTTP requests from clients, verifies and processes the data, and then submits it to the Stability Blockchain.

The **API Gateway** serves as the entry point for all requests, responsible for:

- **Authentication**: Verifies that the transaction is submitted using a private or public API key. Users are able to create their own API Key on the [Stability Portal](https://account.stabilityprotocol.com/keys)
- **Data Validation**: Verifying the structure of incoming JSON data, specifically checking the presence of required fields such as `arguments`.
- **Network**: This RPC endpoint API is available on both **Testnet** and **Mainnet**.

**Endpoints**:

- **POST /zkt/try-it-out**: Public endpoint for submitting messages to the blockchain. Note this endpoint may be limited. Any transactions submitted to this account are signed by a single account - `0x7f521250d3aacba194dbb33427ffea2c546b433d`. You can view this account on our [Testnet Explorer](https://explorer.stble.io/testnet/address/0x7f521250d3aacba194dbb33427ffea2c546b433d/) and our [Mainnet Explorer](https://stability.blockscout.com/address/0x7F521250d3AAcba194dBB33427fFEa2C546B433d).
- **POST /zkt/your-api-key**: An authenticated endpoint for submitting messages to the blockchain. To obtain a free API Key, please visit [Stability Portal](https://account.stabilityprotocol.com/keys). Transactions submitted via this endpoint are signed by a wallet exclusive to your API key.

### Data Flow Example

1. **Client Request**:

   ```json
   {
     "arguments": "Hello, Blockchain!"
   }
   ```

2. **API Gateway Validation**:
   - Checks for `"arguments"` field.
3. **ZKT Processing**:

   - Constructs and signs a transaction.

4. **Sequencer**:
   - Broadcasts the transaction.

---

### Security Considerations

- **API Rate Limiting**: Enforced at the API Gateway to prevent spam or denial-of-service attacks.
- **Data Privacy**: Although messages are public, the initator of the transaction is unknown when using the public key.
- **Max Payload**: The maximum size of a ZKT transaction payload is 1 MB.

### Error Handling

- **Validation Errors**: Returned if the request body is missing required fields or contains incorrect formats.
- **Network Errors**: Handled gracefully with retry logic if the transaction fails to broadcast due to network issues. |

---

### Basic Request Example - Write Message

Below is an example of a POST request that posts a simple message to the blockchain using ZKT.

Request:

`Linux/macOS Shell`

```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" \
-H "Content-Type: application/json" \
--data '{ "arguments": "Your message here" }'
```

`Windows Command Prompt`

```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" -H "Content-Type: application/json" --data "{ \"arguments\": \"Your message here\" }"
```

Response:

```json
{
  "success": true,
  "hash": "0x48b3861c7e04e82fd7bfcec4a1e370950abb65851b6a676515bbc8bee01b470d"
}
```

---

## Advanced Features

ZKT extends its capabilities beyond simple message posting by allowing direct interaction with smart contracts on the Stability Blockchain. This feature enables users to perform complex operations such as:

- **Executing Smart Contract Functions**: Invoke any function defined in a smart contract, whether it's to read data (view functions) or modify the blockchain state (transactional functions).
- **Custom Transactions**: Craft transactions that interact with decentralized applications (dApps) without the need for specialized blockchain development tools.
- **Simplified Interaction Model**: Use standard HTTP POST requests to perform actions that would typically require a blockchain client or wallet software.

---

### Explanation of Advanced Request Parameters

When interacting with smart contract functions via the ZKT endpoint, the request body should be a JSON object containing the following fields:

| Field       | Description                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `abi`       | Array of ABI entries (functions/events) the service needs to encode / decode your call.                |
| `to`        | Address of the target smart contract.                                                                  |
| `method`    | Name of the contract function to invoke.                                                               |
| `arguments` | Array of arguments for `method` (empty array `[]` if none).                                            |
| `id`        | Optional request identifier for matching responses.                                                    |
| `wait`      | Optional boolean; if `true`, the call blocks until the transaction is mined and a receipt is returned. |

---

### Explanation of Advanced Response Parameters

The response will be a JSON object containing:

| Field                     | Description                                                                                                                                                       |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| success                   | A boolean indicating whether the request was successful.                                                                                                          |
| transactionHash or output | Depending on whether the function is a state-changing (write) or view (read) operation, the response will contain either the transaction hash or the output data. |
| id                        | The identifier corresponding to the request.                                                                                                                      |

---

### Advanced Request Example - Storage Contract

Below is an example of a POST request that interacts with deployed smart contract on Stability Testnet.

**_Smart Contract Read Request_**:

This is a sample request that reads the `getFile` function of an example smart contract deployed on Stability Testnet. The smart contract is a simple storage contract that stores a file hash as well as a file name. The following request uses the file hash to retrieve the owner of the file, the file name, and confirmation of the file hash.

Request:

`Linux/macOS Shell`

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

`Windows Command Prompt`

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"abi\": [ \"function storeFile(string fileName, bytes32 fileHash)\", \"function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))\", \"event FileStored(address indexed owner, string fileName, bytes32 fileHash)\" ], \"to\": \"0xaDf4a1165737b406aD510045d4562BE30C14C276\", \"method\": \"getFile\", \"id\": 2, \"arguments\": [ \"0x8e21513d95607300128ceb8bd985f87ea157a5e4cb416b070ca02e9689f9c26c\" ] }"
```

Response:

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

**_Smart Contract Write Request_**:

This is a sample request that uses the `storeFile` function of an example smart contract deployed on Stability Testnet. Change the `arguments` parameter to store your own file.

Request:

`Linux/macOS Shell`

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
  ],
}'
```

`Windows Command Prompt`

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"abi\": [ \"function storeFile(string fileName, bytes32 fileHash)\", \"function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))\", \"event FileStored(address indexed owner, string fileName, bytes32 fileHash)\" ], \"to\": \"0xaDf4a1165737b406aD510045d4562BE30C14C276\", \"method\": \"storeFile\", \"id\": 1, \"arguments\": [ \"example.txt\", \"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\" ] }"
```

Response:

```json
{
  "success": true,
  "hash": "0xeebda882d3e48d1f28819b7439d109c2aeb398f657a8f99f55e9ad83233aa4b8",
  "id": 1
}
```

**_Smart Contract Deploy Request_**:

This is a sample request that deploys a new smart contract to Stability Testnet. Change the code parameter to your actual Solidity smart contract, and optionally supply constructor arguments via the arguments array if your contract requires them.

`Linux/macOS Shell`

```bash
curl -X POST 'https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out' \
    -H "Content-Type: application/json" \
    --data '{
"code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract GreetingContract {\n    string private greeting;\n    uint256 private value;\n\n    constructor(string memory _greeting, uint256 _initialValue) {\n        greeting = _greeting;\n        value = _initialValue;\n    }\n\n    function getGreeting() external view returns (string memory) {\n        return greeting;\n    }\n\n    function getValue() external view returns (uint256) {\n        return value;\n    }\n\n    function setValue(uint256 _newValue) external {\n        value = _newValue;\n    }\n}",
"arguments": ["Hello, world!", "123"]
}'
```

`Windows Command Prompt`

```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"code\": \"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.0;\\n\\ncontract GreetingContract {\\n    string private greeting;\\n    uint256 private value;\\n\\n    constructor(string memory _greeting, uint256 _initialValue) {\\n        greeting = _greeting;\\n        value = _initialValue;\\n    }\\n\\n    function getGreeting() external view returns (string memory) {\\n        return greeting;\\n    }\\n\\n    function getValue() external view returns (uint256) {\\n        return value;\\n    }\\n\\n    function setValue(uint256 _newValue) external {\\n        value = _newValue;\\n    }\\n}\", \"arguments\": [ \"Hello, world!\", \"123\" ] }"
```

Response:

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
