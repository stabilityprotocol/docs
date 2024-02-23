---
sidebar_position: 1
---

# Getting Started

This quickstart is intended for users who wish to use the Stability Network using browser-based extensions. For this example, we will be using Metamask, the most popular browser extension for interacting with blockchains.


## MetaMask Configuration

MetaMask allows users to interact with the Stability blockchain easily. Here's how to set it up for the Stability Protocol chain:

### 1. Installing MetaMask

If you haven't already, install MetaMask for your browser from the [official MetaMask website](https://metamask.io/).

### 2. Sign Up For An API Key

After installation, you need to add the Stability Protocol network to MetaMask. For this, you will need to register for an API Key. 

![Registration Screen](../../static/img/register.png)

To begin, navigate to Stability's [Account Manager](https://account.stabilityprotocol.com/keys) page and select your preferred method of registration. To receive an API key, you must register using either Github, Google, or Email. If you opt to register via email, ensure to verify your email address.

It's important to note that registrations through Metamask or Magiclink do not provide a dedicated API key.

![Generate API Key Screen](../../static/img/createapi.png)

Once logged in to Stability's Account Manager, locate the option for generating an API key. Click on the designated button to create your unique API key.

Click the info button to reveal your private RPC address. We will be using this to connect to Stability.


### 3. Add Network to Metamask

1. **Access MetaMask Extension**

    Click on the MetaMask extension icon in your browser.

2. **Open Settings**

    Inside the MetaMask interface, click on the menu icon (three horizontal lines) and then select `Settings`.

3. **Navigate to Networks**

    In the `Settings` menu, find and click on `Networks`.

4. **Add New Network**

    Click on `Add Network` to start the process of adding a new network.

5. **Choose Manual Addition**

    Select the option to `Add A Network Manually`.

6. **Enter Network Details**

    ![MetaMask RPC Screenshot](../../../static/img/stability-metamask-screenshot.png)

    Fill in the network details as follows:

    - **Network Name:** Stability
    - **New RPC URL:** `https://free.stble.io/`
    - **Chain ID:** 20180427
    - **Currency Symbol:** FREE
    - **Block Explorer URL:** `https://stability-testnet.blockscout.com/`

    Note: You may encounter a warning regarding the currency symbol. This is expected, as the Stability network does not use a currency for gas fees. The network can be used without a currency balance.

7. **Save and Connect**

    After entering all the information, click `Save`. MetaMask will automatically connect to the newly added network.

  - **Mainnet Configuration:**

    - Network Name: Stability Protocol Mainnet
    - New RPC URL: `https://free.stabilityprotocol.com`
    - Chain ID: 101010
    - Currency Symbol: FREE
    - Block Explorer URL: WIP

  - **Testnet Configuration:**
    - Network Name: Stability Protocol Testnet
    - New RPC URL: `https://free.testnet.stabilityprotocol.com`
    - Chain ID: 20180427
    - Currency Symbol: FREE
    - Block Explorer URL: https://stability-testnet.blockscout.com

Now you're connected to the Stability Protocol network through MetaMask and ready to make transactions or interact with smart contracts.


## Requirements for Transactions

**Mainnet Transactions:** For executing transactions on the Stability Protocol mainnet, users are required to obtain an API key. This key enables authenticated access to the network, ensuring secure and authorized transaction execution. The API key creation process is straightforward and can be initiated through our Dashboard, designed to guide users through the necessary steps.

**Testnet Transactions:** While the testnet is generally more accessible and does not require an API key for basic interactions, certain actions may still necessitate authentication. This approach allows developers to test their applications in a controlled environment, closely simulating mainnet conditions with fewer constraints.

For further details on the API key creation process and other requirements, refer to the [Transactions](./transactions.md) section.
