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

### Architecture Overview

The ZKT solution is designed around a RESTful service that accepts HTTP requests from clients, verifies and processes the data, and then submits it to the Stability Blockchain. 

The **API Gateway** serves as the entry point for all requests, responsible for:
- **Authentication**: Verifies that the transaction is submitted using a private or public API key. Users are able to create their own API Key on the [Stability Portal](https://account.stabilityprotocol.com/keys)
- **Data Validation**: Verifying the structure of incoming JSON data, specifically checking the presence of required fields such as `arguments`.
- **Network**: This RPC endpoint API is available on both **Testnet** and **Mainnet**.

**Endpoints**:
- **POST /zkt/try-it-out**: Public endpoint for submitting messages to the blockchain. Note this endpoint may be limited. Any transactions submitted to this account are signed by a single account - `0x7f521250d3aacba194dbb33427ffea2c546b433d`. You can view this account on our [Testnet Explorer](https://stability-testnet.blockscout.com/address/0x7f521250d3aacba194dbb33427ffea2c546b433d) and our [Mainnet Explorer](https://stability.blockscout.com/address/0x7F521250d3AAcba194dBB33427fFEa2C546B433d).
- **POST /zkt/your-api-key**:  An authenticated endpoint for submitting messages to the blockchain. To obtain a free API Key, please visit [Stability Portal](https://account.stabilityprotocol.com/keys). Transactions submitted via this endpoint are signed by a wallet exclusive to your API key.


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
- **Network Errors**: Handled gracefully with retry logic if the transaction fails to broadcast due to network issues.                                                                                                                 |

---

### Basic Request Example - Write Message ###

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
   "success":true,
   "hash":"0x48b3861c7e04e82fd7bfcec4a1e370950abb65851b6a676515bbc8bee01b470d"
}
```
---
## Advanced Features ##

ZKT extends its capabilities beyond simple message posting by allowing direct interaction with smart contracts on the Stability Blockchain. This feature enables users to perform complex operations such as:

- **Executing Smart Contract Functions**: Invoke any function defined in a smart contract, whether it's to read data (view functions) or modify the blockchain state (transactional functions).
- **Custom Transactions**: Craft transactions that interact with decentralized applications (dApps) without the need for specialized blockchain development tools.
- **Simplified Interaction Model**: Use standard HTTP POST requests to perform actions that would typically require a blockchain client or wallet software.

---

### Explanation of Advanced Request Parameters ###

When interacting with smart contract functions via the ZKT endpoint, the request body should be a JSON object containing the following fields:

| Field     | Description                                                                                                                                                                       |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| abi       | An array containing the ABI definitions of the functions and events you want to interact with. This allows the service to understand how to encode and decode the function calls. |
| to        | The address of the smart contract you are interacting with.                                                                                                                       |
| method    | The name of the function you want to call.                                                                                                                                        |
| id        | An optional identifier for your request. This is useful for matching responses to requests.                                                                                       |
| arguments | An optional array containing the arguments to be passed to the function, if required.                                                                                                                   |

---
### Explanation of Advanced Response Parameters ###

The response will be a JSON object containing:

| Field     | Description                                                                                                                                                                       |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| success       | A boolean indicating whether the request was successful. |
| transactionHash or output       | Depending on whether the function is a state-changing (write) or view (read) operation, the response will contain either the transaction hash or the output data.                                                                                                                       |
| id    | The identifier corresponding to the request.                  
---
### Advanced Request Example - Storage Contract ###

Below is an example of a POST request that interacts with deployed smart contract on Stability Testnet.


***Smart Contract Read Request***:


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

***Smart Contract Write Request***:

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
  ]
}'
```

`Windows Command Prompt`
```bash
curl -X POST https://rpc.testnet.stabilityprotocol.com/zkt/try-it-out -H "Content-Type: application/json" -d "{ \"abi\": [ \"function storeFile(string fileName, bytes32 fileHash)\", \"function getFile(bytes32 fileHash) view returns (tuple(address owner, string fileName, bytes32 fileHash))\", \"event FileStored(address indexed owner, string fileName, bytes32 fileHash)\" ], \"to\": \"0xaDf4a1165737b406aD510045d4562BE30C14C276\", \"method\": \"storeFile\", \"id\": 1, \"arguments\": [ \"example.txt\", \"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\" ] }"
```

Response:
```json
{
   "success":true,
   "hash":"0xeebda882d3e48d1f28819b7439d109c2aeb398f657a8f99f55e9ad83233aa4b8",
   "id":1
}
```

