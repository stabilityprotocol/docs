---
sidebar_position: 2
---

# FAQ

_Frequently asked questions_

## Using Stability

### How can a public blockchain work without cryptocurrency?

Stability sets all gas prices to zero, therefore there is no cost to perform a transaction. 

### Can I use my existing wallet app on Stability?

Yes, all EVM-compatible wallets, such as Metamask, work on Stability.

### Can I use my existing Ethereum address on Stability?

Yes. Private keys used on Ethereum, or any other EVM-based blockchain, will resolve to the same public address.

### How can I connect to Global Trust Network (GTN)?

Global Trust Network (GTN) uses the same architecture for performing transactions as most blockchain networks. Simply connect to an RPC and you are able to perform transactions on GTN.

To perform transactions on GTN, you must sign up for an API key. This allows for up to 1,000 daily transactions per API Key on Global Trust Network, and only requires a sign on using your e-mail, Github, or Google account. It is completely free. For an easy step-by-step guide to doing so, please check out [User Quickstart](../users/getting_started.md).

The connection details for GTN are as follows. Simply replace 'YOUR_API_KEY' with your API key.
    - **Network Name:** Global Trust Network
    - **New RPC URL:** `https://rpc.stabilityprotocol.com/zgt/YOUR_API_KEY`
    - **Chain ID:** 101010
    - **Currency Symbol:** FREE
    - **Block Explorer URL:** `https://stability.blockscout.com/`

### How can I connect to Stability Testnet?

Stability uses the same architecture for performing transactions as most blockchain networks. Simply connect to an RPC and you are able to perform transactions on Stability.

 We currently offer two options for connecting to Stability Testnet.

Our public RPC allows a limit of 25 transactions per address. Users wishing to go beyond 25 free daily transactions should register for a free API Key on our testnet. This provides a private RPC this allows for up to 1,000 monthly transactions per API Key on Stability Testnet, and only requires a sign on using your e-mail, Github, or Google account. It is completely free. For an easy step-by-step guide to doing so, please check out [User Quickstart](../users/getting_started.md).

Our connection details for our public RPC is as follows -
    - **Network Name:** Stability Test Net
    - **New RPC URL:** `https://rpc.testnet.stabilityprotocol.com/`
    - **Chain ID:** 20180427
    - **Currency Symbol:** FREE
    - **Block Explorer URL:** `https://stability-testnet.blockscout.com/`

The setup details for a private RPC on Stability Testnet are the same, save for the RPC URL. Simply replace 'YOUR_API_KEY' with your API key.
    - **Network Name:** Stability Test Net
    - **New RPC URL:** `https://rpc.testnet.stabilityprotocol.com/zgt/YOUR_API_KEY`
    - **Chain ID:** 20180427
    - **Currency Symbol:** FREE
    - **Block Explorer URL:** `https://stability-testnet.blockscout.com/`

### Will using the private RPC result in my transactions occurring on a different network?

No, all public and private transactions will occur on the same public testnet network.

### What happens if I run out of free transactions?

If the daily free transactions exceed your allocated daily limit, your transactions will not be processed by Stability Testnet. Each transaction will return as 'Failed'.

### Why are there limits on the amount of transactions?

We set limits to prevent spamming of the network.

## Developing on Stability

### I am a developer - how do I develop on Stability?

Developing on Stability uses the same tooling as Ethereum, or any other EVM-based blockchain. 

### Can I deploy and interact with smart contracts on Stability? Is it the same as Ethereum?

Yes. Stability is an EVM-based blockchain and most smart contract functionality remains the same. There are a few notable differences due to our tokenless model. For further detail, view our [What is different on Stability](../developers/what_is_different.md) documentation.

### Can I create and deploy my own tokens on the Stability?

Yes. Go nuts! The Stability Testnet is here for experimentation, and exploring the possiblities of zero-gas transactions.

### I would like to have a larger quota for Stability. How can I do this?

Please contact us using the following [`Google Form`](https://docs.google.com/forms/d/e/1FAIpQLSfiBQOc0z9HtHyHCH1QCIZWQ0mdJ8koGaWysErJHJRylQy2Yw/viewform)

### What is the block time on Stability?

Our average block time is ~2secs.

### What is the current block size on Stability?

Our current block size allows for 300,000,000 gas units per block.

### What is the maximum size of a transaction?

The maximum size for a transaction is 260,000,000 gas units.

<!-- ### Community

## What future developments are planned for Stability, and how can I stay updated?

## How can I contribute to the development and improvement of the Stability platform? -->