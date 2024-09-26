---
sidebar_position: 1
---

# Tutorial: Using ethers.js and TypeScript to Read a Smart Contract

## Prerequisites
Before we begin, make sure you have the following installed on your machine:
1. **Node.js** (v12.x or higher)
2. **npm** (comes with Node.js)
3. **TypeScript** (you can install globally using `npm install -g typescript`)
4. **ethers.js** (we will install it during the tutorial)
5. A basic understanding of TypeScript and Solidity

---

## 1. Setting Up the Project

### Step 1: Initialize the Project

First, create a new directory for your project and initialize it as a Node.js project:

```bash
mkdir hello-world-ethers
cd hello-world-ethers
npm init -y
```
### Step 2: Install Dependencies

You need to install the following dependencies:
- `ethers`: A library to interact with Ethereum and EVM-compatible blockchains.
- `typescript`: For TypeScript support.
- `ts-node`: To run TypeScript files directly.

```bash
npm install ethers
npm install --save-dev typescript ts-node
```
### Step 3: Initialize TypeScript

Next, initialize a basic TypeScript configuration:

```bash
npx tsc --init
```

This will generate a `tsconfig.json` file. You can keep the default configuration.

## 2. Writing the TypeScript Code

Now, we will write a TypeScript file to interact with the deployed "Hello World!" smart contract.

### Step 1: Create the `readMessage.ts` File

Create a new file named `readMessage.ts` inside your project directory.

```bash
touch readMessage.ts
```

### Step 2: Write the TypeScript Code

Open `readMessage.ts` and add the following code: 
```typescript
import { ethers } from "ethers";

// Contract details
const contractAddress = "0x757F70Bd8D26F2F2b3F6B623962620e999ABe8B1";
const contractABI = [
  {
    "inputs": [],
    "name": "getMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Connect to the Stability Network
const providerUrl = "https://rpc.testnet.stabilityprotocol.com";
const provider = new ethers.JsonRpcProvider(providerUrl);

async function readMessage() {
  try {
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    // Call the getMessage function
    const message = await contract.getMessage();
    
    console.log("The current message is:", message);
  } catch (error) {
    console.error("Error reading the message:", error);
  }
}

// Run the function
readMessage();
```

#### Explanation:

- **Contract Details**: We define the `contractAddress` and the ABI (Application Binary Interface) for the `getMessage` function. This contract has been deployed by the Stability Team for this example.
- **Provider**: We connect to the Stability Testnet Network using the JSON RPC provider URL. Ideally, create your own free RPC in [Stability Account Manager](https://account.stabilityprotocol.com/keys), as this public RPC will severely limit your reads.
- **Contract Interaction**: We create a contract instance using `ethers.Contract` and call the `getMessage` function to retrieve the message stored on the contract.

## 3. Running the Code

### Step 1: Run the Typescript Code

To run your TypeScript code, use `ts-node`. This will compile and execute your TypeScript files:

```bash
npx ts-node readMessage.ts
```
#### Expected Output:
If the everything is set up correctly, you should see something like this in your console:
```bash
The current message is: Hello, World!
```

## 4. Done!

In this tutorial, you learned how to read a message from a Solidity smart contract using ethers.js and TypeScript on the Stability Network. You can extend this tutorial by interacting with more functions or deploying your own contract!