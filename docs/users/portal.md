# Stability Portal

![Account Overview](../../static/img/stability-portal.jpg)

## Welcome to the Stability Portal

The [Stability Protocol Dashboard](https://portal.stabilityprotocol.com) serves as your central hub for managing and executing Zero Gas Transactions (ZGT) within our ecosystem. Designed with simplicity and efficiency in mind, it empowers users to seamlessly interact with blockchain technology, eliminating traditional barriers such as transaction costs.

## Why Use the Stability Protocol Dashboard?

Our dashboard is the gateway to harnessing the full potential of the Stability Protocol, offering:

- **Cost-Efficiency**: Execute blockchain transactions without the burden of gas fees through our ZGT feature.
- **Secure Management**: Utilize unique API keys for secure transactions and interactions within the protocol.
- **Scalable Solutions**: Whether you're a startup or a large enterprise, our infrastructure is built to accommodate your needs.

## How It Works

The Stability Protocol Dashboard simplifies the management and execution of transactions, structured around key features:

### 1. API Key Management

Securely generate and manage your API keys, essential for authenticating your transactions on the blockchain.

1. Visit the [**API Keys**](https://portal.stabilityprotocol.com/keys) section within the dashboard.
2. Select **Create New API Key**.
3. Safely store your new API key.

![Create API Key](./portal.stabilityprotocol.com_keys.png)

### 2. Executing Transactions

Initiate and manage your transactions directly from the dashboard, leveraging the ZGT system for efficiency and cost savings.

```javascript
const baseUrl = "https://portal.stabilityprotocol.com/";
const apiKey = "YOUR_API_KEY_HERE";
```

### 3. Integration and Usage

Integrate the Stability Protocol into your projects with ease, using our straightforward API and the ethers.js library for Ethereum blockchain interactions:

```javascript
const { ethers } = require("ethers");

const baseUrl = "https://portal.stabilityprotocol.com/";
const apiKey = "YOUR_API_KEY_HERE";

const provider = new ethers.providers.JsonRpcProvider(
  `${baseUrl}?api_key=${apiKey}`
);
```

## Getting Started

Kickstart your journey with the Stability Protocol Dashboard by:

1. **Creating Your API Key**: A vital step for secure and authenticated access to our services.
2. **Integrating With Your Projects**: Utilize our API within your applications for efficient blockchain interactions.
3. **Monitoring and Analytics**: Access real-time insights into your transactions through the dashboard.
