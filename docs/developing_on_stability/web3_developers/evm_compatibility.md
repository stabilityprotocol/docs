---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EVM Compatibility & Solidity Development

## Introduction

Stability provides a familiar environment for Web3 developers, supporting industry-standard tools like Ethers.js, Viem, Hardhat, and Foundry. You can deploy existing logic with minimal friction. As Stability is gasless, developers will find that some standard operations and Solidity functionalities will not work as expected on Stability.


:::info Important: EVM Compatibility Requirements
**Stability is EVM Compatible with Solidity up to 0.8.24**

**Key Requirements:**
- **Solidity Version**: Must compile at version **0.8.24 or lower**
- **EVM Compiler Version**: Must be **Shanghai or lower**

Currently, Stability has not implemented the Cancun update. Developers must ensure their contracts comply with these version requirements when developing on Stability.  

:::

## Examples

<Tabs>
  <TabItem value="gas" label="Gas Cost & Priority Fee" default>

### Gas Cost and Priority Fee Must Not Be Explicitly Set

On Stability, gas costs and priority fees are not applicable in the same way they are on traditional EVM-based blockchains due to the absence of a native token. `gasPrice` and `maxPriorityFeePerGas` must not be explicitly set to a non-zero number. No definition, or explicit definition to 0, is required.

Here is an example of how this can be achieved using ethers.js:

<Tabs>
  <TabItem value="v6" label="ethers.js v6" default>

```javascript
const tx = {
    ...
    maxFeePerGas: 0n
    maxPriorityFeePerGas: 0n
};
```

  </TabItem>
  
  <TabItem value="v5" label="ethers.js v5">

```javascript
const tx = {
    ...
    gasPrice: ethers.utils.parseUnits("0", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("0", "gwei"),
};
```

  </TabItem>
</Tabs>

  </TabItem>
  
  <TabItem value="native" label="Native Token Value Transfers">

### Native Token Value Transfers

On Stability, there is no native token. Solidity functions designed to move native token value will automatically revert. This is a significant departure from traditional Ethereum-based smart contract interactions, where these methods are commonly used to manage and transfer Ether between accounts. 

- Unsupported functions: `.transfer()`, `.send()`, and any call involving `msg.value`.

The following Solidity code snippets illustrate transactions that would **fail** on Stability:

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

  </TabItem>
  
  <TabItem value="balance" label="Address Balance">

### Address Balance

On Stability, the `address.balance` operation will not function as expected. This operation, which is used to retrieve the balance of Ether (or any native token) held by an address, relies on the existence of a native token. For example:

```bash
function getBalance() public view returns (uint) {
        return address(this).balance;
    }
>> Returns the selected DNT balance
```

  </TabItem>
  
  <TabItem value="payable" label="Payable Declarations">

### Payable Declarations

On Stabilty, declaring functions and addresses as payable is unnecessary since the blockchain does not support native token transactions. Instead, developers should utilize the ERC-20 token standard for transactions involving token transfers. This approach involves first approving the transfer of tokens to a contract, followed by the contract executing the transfer, mirroring the functionality provided by ERC-20 tokens.

  </TabItem>
  
  <TabItem value="receive" label="Receive() & Fallback()">

### `Receive()` and `Fallback()`

The `receive()` and `fallback()` functions in Solidity are designed to handle incoming transactions and unspecified function calls, respectively. However, without the capability to transfer native tokens, these functions lose their primary purpose on Stability. Developers will need to consider alternative methods for contract interactions that do not rely on direct value transfers.

  </TabItem>
</Tabs>

## Review

While developing on Stability offers a familiar experience to working with other EVM-compatible blockchains, the absence of a native token introduces specific considerations that developers must account for. This unique characteristic of Stability necessitates a cautious approach to smart contract and backend development, ensuring that applications are designed with these limitations in mind.
