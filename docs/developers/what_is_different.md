---
sidebar_position: 2
---

# What Is Different In Stability

## Introduction

Stability is compatible with the EVM web3 development environments you're already familiar with, such as Ethers, Viem, Hardhat, Foundry, etc. This compatibility allows developers to seamlessly transition their existing skills and projects to Stability without having to navigate a steep learning curve associated with entirely new development environments.

One of the key differences with Stability is its lack of a native token. This fundamental change affects the execution of transactions that typically involve the transfer of native tokens, which is a core functionality in many Ethereum-based applications. As a result, developers will find that some standard operations and Solidity functionalities will not work as expected on Stability.

# What Is Different In Stability

One of the key differences with Stability is its lack of a native token. This fundamental change affects the execution of transactions that typically involve the transfer of native tokens, which is a core functionality in many Ethereum-based applications. As a result, developers will find that some standard operations and Solidity functionalities will not work as expected on Stability.

## Examples

### Stability is an EVM Compatible with Solidity up to 0.8.24

Stability makes use of the Frontier EVM Pallet. Currently, Stability has not implemented the Cancun update. Developers must compile Solidity at version 0.8.24 or lower.

### Gas Cost and Priority Fee Must Be Set To Zero

On Stability, gas costs and priority fees are not applicable in the same way they are on traditional EVM-based blockchains due to the absence of a native token. Wallets such as Metamask will handle this automatically. However, this means that when constructing transactions, developers must explicitly set the gas cost and priority fee to zero.

Here is an example of how this can be achieved using ethers.js:

Ethers v5

```javascript
const tx = {
    ...
    gasPrice: ethers.utils.parseUnits("0", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("0", "gwei"),
};
```

Ethers v6

```javascript
const tx = {
    ...
    maxFeePerGas: 0n
    maxPriorityFeePerGas: 0n
};
```

### Native Token Value Transfers

On Stability, functions intended for transferring native gas tokens, such as `.transfer`, `.send`, and any operations involving `msg.value`, are not supported. Attempts to execute such transactions will automatically revert. This is a significant departure from traditional Ethereum-based smart contract interactions, where these methods are commonly used to manage and transfer Ether between accounts. For instance, the following Solidity code snippets illustrate transactions that would **fail** on Stability:

```bash
function sendViaTransfer(address payable _to) public payable {
    _to.transfer(msg.value);
}
>> FAIL

function sendViaSend(address payable _to) public payable {
    bool sent = _to.send(msg.value);
    require(sent, "Failed to send Ether");
}
>> FAIL

function sendViaCall(address payable _to) public payable {
    (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    require(sent, "Failed to send Ether");
}
>> FAIL
```

### Address Balance

On Stability, the address.balance operation will not function as expected. This operation, which is used to retrieve the balance of Ether (or any native token) held by an address, relies on the existence of a native token. For example:

```bash
function getBalance() public view returns (uint) {
        return address(this).balance;
    }
>> Returns the selected DNT balance
```

### Payable Declarations

In the context of Stability, declaring functions and addresses as payable is unnecessary since the blockchain does not support native token transactions. Instead, developers should utilize the ERC-20 token standard for transactions involving token transfers. This approach involves first approving the transfer of tokens to a contract, followed by the contract executing the transfer, mirroring the functionality provided by ERC-20 tokens.

### Receive() and Fallback()

The receive() and fallback() functions in Solidity are designed to handle incoming transactions and unspecified function calls, respectively. However, without the capability to transfer native tokens, these functions lose their primary purpose on Stability. Developers will need to consider alternative methods for contract interactions that do not rely on direct value transfers.

## Review

While developing on Stability offers a familiar experience to working with other EVM-compatible blockchains, the absence of a native token introduces specific considerations that developers must account for. This unique characteristic of Stability necessitates a cautious approach to smart contract and backend development, ensuring that applications are designed with these limitations in mind.
