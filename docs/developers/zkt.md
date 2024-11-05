---
sidebar_position: 6
---

# ZKT - HTTP POST on Stability Blockchain

### Overview

ZKT is a feature built on the **Stability Blockchain** that simplifies blockchain interactions by enabling users to submit messages directly to the blockchain via HTTP POST requests. This is an experimental aspect of Stability, aimed at making blockchain interactions as simple as possible.

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
- **POST /zkt/try-it-out**: Public endpoint for submitting messages to the blockchain. Note this endpoint may be limited. Any transactions submitted to this account are signed by a single account - `0x7f521250d3aacba194dbb33427ffea2c546b433d`- [Testnet Explorer Link](https://stability-testnet.blockscout.com/address/0x7f521250d3aacba194dbb33427ffea2c546b433d) [Mainnet Explorer Link](https://stability.blockscout.com/address/0x7F521250d3AAcba194dBB33427fFEa2C546B433d).
- **POST /zkt/your-api-key**:  An authenticated endpoint for submitting messages to the blockchain. To obtain a free API Key, please visit [Stability Portal](https://account.stabilityprotocol.com/keys). Transactions submitted via this endpoint are signed by a wallet exclusive to your API key.

**Sample Request**:
```bash
curl -X POST "https://rpc.stabilityprotocol.com/zkt/try-it-out" -H "Content-Type: application/json" --data "{ "arguments": "Your message here" }"
```

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

### Error Handling

- **Validation Errors**: Returned if the request body is missing required fields or contains incorrect formats.
- **Network Errors**: Handled gracefully with retry logic if the transaction fails to broadcast due to network issues.

### Scalability and Future Considerations

- **Advanced Message Types**: Future versions of ZKT could support additional message types or include metadata for more complex transactions.

---



