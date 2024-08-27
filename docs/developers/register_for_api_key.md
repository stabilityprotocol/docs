---
sidebar_position: 6
---

# API Keys

In this tutorial, you will learn how to create an API key on Stability's Account Manager.

Why do you need to have an API key for using Stability? Our open version of the API is limited to read only. In order to perform transactions we require users to sign up to our **Account Manager**.

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


## Step 3: Ready to Go!

We highly recommend reviewing the section on [What Is Different](./what_is_different.md) regarding Stability as opposed to traditional Ethereum Virtual Machine (EVM) blockchains. Understanding these distinctions is crucial for developers looking to create decentralized applications (dApps) on the Stability platform, especially since certain functionalities, like native token transfers, will not operate in the same way on Stability. It is important to note that Stablity supports Solidity version 0.8.24 or lower. 

Congratulations! You've successfully created an API key on Stability's Account Manager. Now, you're all set to use Stability at no cost. Utilize your private RPC to interact with the Stability network using wallets such as Metamask or frameworks like Viem or Ethers.js.
