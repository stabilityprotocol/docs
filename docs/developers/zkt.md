---
sidebar_position: 6
---

# ZKT - HTTP POST Architecture on Stability Blockchain

### Overview

ZKT (Zero-Knowledge Transactions) is a concept built on the **Stability Blockchain** that simplifies blockchain interactions by allowing users to submit messages directly to the blockchain via HTTP POST requests. This document details the architecture, components, and processes involved in implementing and scaling ZKT for easy and efficient message submission on the blockchain.

### Goals

1. **Ease of Access**: Provide an HTTP interface for seamless blockchain interactions without requiring users to have deep blockchain knowledge.
2. **Security**: Ensure all data submissions are secure, using a zero-knowledge model.
3. **Scalability**: Design a system that can handle high volumes of transactions with minimal latency.
4. **Transparency**: Enable users to verify transactions on an associated block explorer.

### Architecture Overview

The ZKT solution is designed around a RESTful service that accepts HTTP requests from clients, verifies and processes the data, and then submits it to the Stability Blockchain. Key components include:

- **ZKT API Gateway**: Handles incoming HTTP requests and validates the data format and structure.
- **Transaction Manager**: Processes validated requests and constructs transactions for the blockchain.
- **Blockchain Node Interaction Layer**: Communicates with Stability Blockchain nodes to submit transactions.
- **Explorer Integration**: Links each transaction to the Stability Blockchain Explorer for easy verification.

### High-Level Architecture

```
Client (Browser, CLI, etc.)
       |
       | HTTP POST Request
       v
   ZKT API Gateway
       |
       | Transaction Request
       v
 Transaction Manager
       |
       | Signed Transaction
       v
 Blockchain Node Interaction Layer
       |
       | On-chain Confirmation
       v
   Stability Blockchain
       |
       | Tx Hash
       v
  Stability Block Explorer
```

---

### Components

#### 1. ZKT API Gateway

The **API Gateway** serves as the entry point for all requests, responsible for:
- **Authentication**: Ensuring that users are authorized to submit messages. Users are able to create their own API Key on the [Stability Portal](https://account.stabilityprotocol.com/keys)
- **Data Validation**: Verifying the structure of incoming JSON data, specifically checking the presence of required fields such as `arguments`.
- **Network Selection**: Supporting both **Testnet** and **Mainnet** RPC endpoints based on user preferences.

**Endpoints**:
- **POST /zkt/try-it-out**: Public endpoint for submitting messages to the blockchain. Note this endpoint may be limited.
- **POST /zkt/your-api-key**: Individual authenticated API for submitting messages to the blockchain.

**Sample Request**:
```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" -H "Content-Type: application/json" --data "{ "arguments": "Your message here" }"
```

#### 2. Transaction Manager

The **Transaction Manager** is the core processing unit for preparing blockchain transactions:
- **Message Parsing**: Retrieves and prepares the `arguments` data.
- **Transaction Construction**: Wraps the message in a transaction format compatible with the Stability Blockchain (EVM).
- **Transaction Signing**: Signs transactions from a single account - `0x7f521250d3aacba194dbb33427ffea2c546b433d`- [Testnet Explorer Link](https://stability-testnet.blockscout.com/address/0x7f521250d3aacba194dbb33427ffea2c546b433d) [Mainnet Explorer Link](https://stability.blockscout.com/address/0x7F521250d3AAcba194dBB33427fFEa2C546B433d).
- **Rate Limiting and Throttling**: Implements controls to prevent excessive requests, preserving blockchain stability.

#### 3. Blockchain Node Interaction Layer

The **Blockchain Node Interaction Layer** interfaces with the Stability Blockchain network:
- **RPC Node Selection**: Chooses the appropriate RPC endpoint based on the selected network (Testnet or Mainnet).
- **Transaction Broadcasting**: Broadcasts the signed transaction to the selected blockchain node.

#### 4. Stability Block Explorer Integration

Upon successfully broadcasting a transaction, a link to the transaction is generated using the **Stability Block Explorer**:
- **Transaction Hash Mapping**: Combines the transaction hash with the block explorer URL to form a viewable link.
- **Explorer URL Generation**:
  - **Testnet**: `https://stability-testnet.blockscout.com/tx/{txHash}`
  - **Mainnet**: `https://stability.blockscout.com/tx/{txHash}`

---

### Workflow

1. **User Submission**:
   - The client (browser, CLI, etc.) sends a POST request with the message data (`arguments`) to the `/zkt/try-it-out` endpoint.
   
2. **Data Validation**:
   - The ZKT API Gateway validates the structure of the message. If valid, it forwards the request to the Transaction Manager; otherwise, it returns an error.

3. **Transaction Creation**:
   - The Transaction Manager processes the message, signs the transaction, and forwards it to the Blockchain Node Interaction Layer.

4. **Transaction Broadcast**:
   - The Blockchain Node Interaction Layer broadcasts the signed transaction to a Stability Blockchain node and waits for confirmation.

5. **Transaction Response**:
   - Upon confirmation, the transaction hash is returned to the client along with a link to view the transaction on the Stability Block Explorer.

---

### Data Flow Example

1. **Client Request**:
   ```json
   {
       "arguments": "Hello, Blockchain!"
   }
   ```

2. **API Gateway Validation**:
   - Checks for `"arguments"` field.
   
3. **Transaction Manager Processing**:
   - Constructs and signs a transaction using the provided message.

4. **Blockchain Node Interaction Layer**:
   - Broadcasts the transaction and returns the transaction hash.

---

### Security Considerations

- **API Rate Limiting**: Enforced at the API Gateway to prevent spam or denial-of-service attacks.
- **Data Privacy**: Although messages are public, the initator of the transaction is unknown unless using an API key.

### Error Handling

- **Validation Errors**: Returned if the request body is missing required fields or contains incorrect formats.
- **Network Errors**: Handled gracefully with retry logic if the transaction fails to broadcast due to network issues.

### Scalability and Future Considerations

- **Advanced Message Types**: Future versions of ZKT could support additional message types or include metadata for more complex transactions.

---

### Let's Get Experimenting

An open-source Github repo titled [Stability Publisher](https://github.com/stabilityprotocol/stability-publisher-dapp) is available for experimentation of this exciting feature. 

