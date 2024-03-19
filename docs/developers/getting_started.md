---
sidebar_position: 1
---

# Getting Started

This quickstart is tailored for developers eager to connect with and explore the capabilities of the Stability Testnet and Global Trust Network (GTN) directly. This guide is designed for developers aiming to craft decentralized applications (dApps), enthusiasts keen on engaging with Stability's blockchain, and anyone interested in understanding what sets Stability apart from traditional EVMs and smart contracts.

## Prerequisites

This tutorial presumes a foundational understanding of blockchain technology and familiarity with tools that interact directly with the blockchain. For example, smart contracts and development tools such as Remix and Viem.

## Register for an API Key

Global Trust Network (GTN) and Stability Testnet employ API keys to manage transactions. On Global Trust Network, an API key is required to perform write transactions. On Stability Testnet, each address is given a limited number of free transactions without an API key using our public RPC. To increase the number of transactions that a certain user can execute on either chain, users are required to sign up with our [Account Manager](https://account.stabilityprotocol.com/keys) for their very own private RPC address.

### 2. Sign Up For An API Key

#### Step 1 - Navigate to [Stability Portal](https://portal.stabilityprotocol.com/) and click the `Login | New User' button.

![Stability Portal Page](../../static/img/portallogin.png)

#### Step 2 - Select Your Preferred Registration

On this screen, select your preferred method of registration. For this tutorial, we will be following the Google sign-in path. You may also similarly log in via Email, GitHub, Magiclink, or directly through Metamask.  

It is important to note that registrations through Metamask or Magiclink do not provide a dedicated API Key. Without an API Key, you will not be able to perform transactions on Global Trust Network (GTN), and will have limited functionality on Stability Testnet. To receive an API Key, you must register using either GitHub, Google, or Email. 

If you opt to register via email, ensure you can verify your email address.

![Stability Login Screen](../../static/img/portalloginoptions.png)

#### Step 3 - Select Your Preferred Network

Using the dropdown menu on the top right, select the network you wish to generate an API Key on.

![Stability Portal Screen with Networks Highlighted](../../static/img/portalselectnetwork.png)

#### Step 4 - Click the `Create New API Key` Button
![Stability Portal Screen with Create New API Key Button Highlighted](../../static/img/portalcreatenewapikey.png)

#### Step 5 - Congrats! You've created an API Key.

To view your personal RPC URL, click the `Info` button.
![Stability Portal Screen with Info Button Highlighted](../../static/img/portalinfo.png)

Here, you will find your personal RPC URL.
![Stability Portal Screen with API URL Highlighted](../../static/img/portalapikeyurlhighlight.png)

### 3a. Add Network Automatically to Metamask + Other Compatible Wallets

![Metamask Logo](../../static/img/portalmetamasklogo.png)

To add your custom RPC to your browser extension wallet, which will allow you to use Global Trust Network or Stability Testnet, click the Metamask Fox Logo next to your API Key. This will work with Metamask as well as many other browser extension based wallets. 

If you are not able to add the network to your wallet, you may have to add the network manually. Follow the instructions below.

### 3b. Add Network Manually to Metamask

In the event you are unable to add your wallet automatically via clicking the Metamask Fox Logo above, or you wish to add the network manually, simply follow the steps below.

#### Step 1 - Navigate to `Settings` in Metamask.

![Metamask Main Screen with Settings Highlighted](../../static/img/metamasksettings.png)

#### Step 2 - Click on the `Networks` tab.

![Metamask Settings Screen with Networks Highlighted](../../static/img/metamasknetworks.png)

#### Step 3 - Click the `Add a network` button.

![Metamask Networks Screen with 'Add a network' Button Highlighted](../../static/img/metamaskaddnetwork.png)

#### Step 4 - Click the `Add a network manually` text link.

![Metamask Add Network Screen with 'Add a network manually' Highlighted](../../static/img/metamaskaddanetworkmanually.png)

#### Step 5 - Go to the [Stability Account Manager](https://account.stabilityprotocol.com/keys) and copy your API Key.

![Stability Account Manager Screen with an Example API Key Highlighted](../../static/img/apikeyhighlight.png)

#### Step 6 - Fill out the network settings using the details below. Be sure to replace the `YOUR_API_KEY` with your own API Key. Afterward, click Save.
    
![Metamask Manual Network Screen with Details Filled and Save Button Highlighted](../../static/img/metamaskmanualnetworksave.png)



| **Property**               | **Global Trust Network**                                       | **Stability Testnet**                                               |
|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------|
| Network Name               | Global Trust Network                                           | Stability Test Net                                                   |
| New RPC URL                | `https://gtn.stabilityprotocol.com/zgt/YOUR_API_KEY`      | `https://free.testnet.stabilityprotocol.com/zgt/YOUR_API_KEY` |
| Chain ID                   | 101010                                                          | 20180427                                                             |
| Currency Symbol            | FREE                                                            | FREE                                                                 |
| Block Explorer URL         | `https://stability.blockscout.com/`                             | `https://stability-testnet.blockscout.com/`                          |

### 4. Review What Is Different With Stability

We highly recommend reviewing the section on [What Is Different](./what_is_different.md) regarding Stability as opposed to traditional Ethereum Virtual Machine (EVM) blockchains. Understanding these distinctions is crucial for developers looking to create decentralized applications (dApps) on the Stability platform, especially since certain functionalities, like native token transfers, will not operate in the same way on Stability.

## Now Start Swimming
Armed with this knowledge and your API key, you're well-prepared to embark on your development journey with the Stability Network. Dive in and start innovating! Happy hacking!