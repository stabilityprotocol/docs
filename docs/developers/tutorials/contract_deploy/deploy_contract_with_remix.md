# Deploy Contract Using Remix

## 1. Introduction

### Tutorial Objective

This tutorial teaches how to deploy an ERC20 Smart Contract on the Stability Testnet using Remix IDE.

Remix is an online smart contract IDE that does not require installation.

### Prerequisites

- Basic knowledge of programming and blockchain
- Metamask installed

### 2. Sign Up For An API Key

If you have not done so, review the developer [getting started](../../getting_started.md) documentation to create your own API Key. 


## 3. Setting Up Remix

First, navigate to [Remix IDE](https://remix.ethereum.org/)

Once you are in Remix, create a file inside the 'contracts' folder. For this tutorial, we are going to deploy an ERC20 token, so we will name it 'MyERC20.sol'.

In this file, paste the following code:

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```

## 4. Compile contract

Once your contract is finished, you need to compile it. To do this, click on the `Solidity Compiler` option in the left sidebar. You will see something like this:

![Compile remix](compile_remix.png)

Then, click on the `Compile MyERC20.sol` button.

Now, your contract is successfully compiled.

## 5. Deploy

Now you need to deploy it. To do this, navigate to the `Deploy & Run Transactions` section using the left sidebar.

There, you will see something like this:

![Deploy with remix](deploy_remix.png)

Select `Injected Provider - MetaMask` in the `ENVIRONMENT` input.

In the `Contract` section, choose `MyERC20`.

Then, you will need to set the initial supply of our token, as it is a required variable in the constructor method of the MyERC20 contract.

For example, set the initial supply to `1000000`.

After typing the initial supply, click on the orange button. A MetaMask popover will appear; click on `Confirm` and wait.

After a moment, the contract will be deployed, and you will see something like this:

![Contract deployed image](deployed_remix.png)

Congratulations! You now have a smart contract deployed.

If you search for that address in the Stability block explorer, you will see something similar to this:

![Contract deployed image](contract_deployed_image.png)

### Conclusion

Deploying a contract on the Stability network using Remix is very simple, as despite having zero gas transactions, the network maintains EVM compatibility, which allows using all existing tools in the EVM ecosystem to expedite the development of applications.
