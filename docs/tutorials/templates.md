---
sidebar_position: 3
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Smart Contract Templates

This page offers ready-to-use, copy/paste contract templates designed for gasless transactions and full Stability platform compatibility. For each template, you'll find the full contract code, a concise explanation of how it works, and deployment / interaction examples.

- All examples target Solidity compiler version **≤ 0.8.24** and are compatible with the **Shanghai EVM** or earlier.

- For a deeper dive into platform-specific EVM limitations and Solidity best practices, visit [EVM Compatibility & Solidity Development](../developing_on_stability/web3_developers/evm_compatibility.md).

### Getting Started

These templates assume you're familiar with either:
- **Deploying contracts** using [Remix](./contract_deploy/deploy_contract_with_remix.md) or **reading contract data** with [ethers.js](./contract_read/hello_world.md), or
- **Understanding the ZKT API** for Web2-friendly interactions via [ZKT API Reference](../developing_on_stability/web2_developers/zkt/api_reference.md)

If you're new to smart contracts, we recommend starting with these templates below.

---

## Templates

<Tabs>
  <TabItem
    value="basic_storage"
    label={<span style={{ whiteSpace: "pre-line" }}>{"Basic Storage\n(Read/Write)"}</span>}
    default
  >

### Overview  
BasicStorage is the simplest read/write contract: it stores a `string` and a `uint256`, exposes read access, and emits events whenever values change. It is a clean starting point for understanding how state is persisted on-chain without any token or value transfer logic.

### How It Works  
On deployment, the state starts with Solidity defaults (empty string and `0`). Reads (`getMessage()`, `getValue()`) are `view` and cost no state changes; writes (`setMessage()`, `setValue()`) update storage and emit events so indexers and frontends can react.

The contract uses two private state variables (`message` and `value`) that persist in contract storage. Read functions (`getMessage()`, `getValue()`) are pure queries with no storage writes, while write functions (`setMessage()`, `setValue()`) mutate storage and emit `MessageUpdated`/`ValueUpdated` events so off-chain systems can track updates.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BasicStorage {
    string private message;
    uint256 private value;

    event MessageUpdated(string oldMessage, string newMessage);
    event ValueUpdated(uint256 oldValue, uint256 newValue);

    function getMessage() external view returns (string memory) {
        return message;
    }

    function setMessage(string calldata newMessage) external {
        string memory oldMessage = message;
        message = newMessage;
        emit MessageUpdated(oldMessage, newMessage);
    }

    function getValue() external view returns (uint256) {
        return value;
    }

    function setValue(uint256 newValue) external {
        uint256 oldValue = value;
        value = newValue;
        emit ValueUpdated(oldValue, newValue);
    }
}
```

### Functions

#### Write Functions

<Tabs groupId="basic-storage-write">
  <TabItem value="setMessage" label="setMessage" default>

`setMessage()`: Updates the stored message and emits an event containing **both the old and new values** (useful for UI updates and indexing).

```solidity
function setMessage(string calldata newMessage) external {
    string memory oldMessage = message;
    message = newMessage;
    emit MessageUpdated(oldMessage, newMessage);
}
```

  </TabItem>
  <TabItem value="setValue" label="setValue">

`setValue()`: Updates the stored number and emits an event containing **both the old and new values**.

```solidity
function setValue(uint256 newValue) external {
    uint256 oldValue = value;
    value = newValue;
    emit ValueUpdated(oldValue, newValue);
}
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="basic-storage-read">
  <TabItem value="getMessage" label="getMessage" default>

`getMessage()`: `view` reads do not modify state. Typically you call these via RPC (`eth_call`) without sending a transaction.

```solidity
function getMessage() external view returns (string memory) {
    return message;
}
```

  </TabItem>
  <TabItem value="getValue" label="getValue">

`getValue()`: Read the current number value (no state change).

```solidity
function getValue() external view returns (uint256) {
    return value;
}
```

  </TabItem>
</Tabs>

### Events
Events are emitted to notify off-chain systems of state changes. They are indexed and searchable, making them ideal for frontends and indexers.

- **`MessageUpdated(string oldMessage, string newMessage)`** - Emitted when `setMessage()` is called. Includes both the previous and new message values for tracking changes.
- **`ValueUpdated(uint256 oldValue, uint256 newValue)`** - Emitted when `setValue()` is called. Records the old and new numeric values for audit purposes.

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, and `YOUR_PRIVATE_KEY` with your own values.

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with no constructor args.</li>
      <li>Call <code>getMessage()</code> / <code>getValue()</code> to read.</li>
      <li>Call <code>setMessage()</code> / <code>setValue()</code> to write.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function getMessage() view returns (string)",
  "function setMessage(string newMessage)",
  "function getValue() view returns (uint256)",
  "function setValue(uint256 newValue)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const current = await contract.getMessage();
await contract.setMessage("Hello Stability");
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function getMessage() view returns (string)",
  "function setMessage(string newMessage)",
  "function getValue() view returns (uint256)",
  "function setValue(uint256 newValue)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const current = await contract.getMessage();
await contract.setMessage("Hello Stability");
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract (no constructor arguments):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract BasicStorage {\n    string private message;\n    uint256 private value;\n\n    event MessageUpdated(string oldMessage, string newMessage);\n    event ValueUpdated(uint256 oldValue, uint256 newValue);\n\n    function getMessage() external view returns (string memory) {\n        return message;\n    }\n\n    function setMessage(string calldata newMessage) external {\n        string memory oldMessage = message;\n        message = newMessage;\n        emit MessageUpdated(oldMessage, newMessage);\n    }\n\n    function getValue() external view returns (uint256) {\n        return value;\n    }\n\n    function setValue(uint256 newValue) external {\n        uint256 oldValue = value;\n        value = newValue;\n        emit ValueUpdated(oldValue, newValue);\n    }\n}",
  "arguments": [],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: method <code>getMessage</code> with empty <code>arguments</code>.</p>

```json
{
  "abi": ["function getMessage() view returns (string)", "function setMessage(string newMessage)"],
  "to": "CONTRACT_ADDRESS",
  "method": "getMessage",
  "arguments": [],
  "id": 1
}
```

    <p>Write: method <code>setMessage</code> with <code>["Hello Stability"]</code>.</p>

```json
{
  "abi": ["function getMessage() view returns (string)", "function setMessage(string newMessage)"],
  "to": "CONTRACT_ADDRESS",
  "method": "setMessage",
  "arguments": ["Hello Stability"],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem
    value="access_control"
    label={<span style={{ whiteSpace: "pre-line" }}>{"Access Control\n(Whitelists)"}</span>}
  >

### Overview
AccessControl combines two common permission layers: a single owner (admin) and a whitelist (allowed users). This pattern is useful when you need one administrator to grant access while keeping protected actions open to multiple approved accounts.

### How It Works  
On deployment, the deployer becomes the owner. The owner can add or remove accounts from the whitelist via `setWhitelisted()`. Only whitelisted addresses can run the protected action; non-whitelisted callers are rejected with a clear revert reason.

The contract uses two permission layers: the `owner` address (admin) and a `whitelist` mapping. The `onlyOwner` modifier gates admin functions like `transferOwnership()` and `setWhitelisted()`, while `onlyWhitelisted` protects user-facing actions like `protectedAction()`. Events (`OwnershipTransferred`, `WhitelistUpdated`) track permission changes for auditability. The `isWhitelisted()` function provides a read-only check for access status.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AccessControl {
    address public owner;
    mapping(address => bool) private whitelist;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event WhitelistUpdated(address indexed account, bool isWhitelisted);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setWhitelisted(address account, bool isWhitelisted) external onlyOwner {
        whitelist[account] = isWhitelisted;
        emit WhitelistUpdated(account, isWhitelisted);
    }

    function isWhitelisted(address account) external view returns (bool) {
        return whitelist[account];
    }

    function protectedAction() external onlyWhitelisted returns (string memory) {
        return "Whitelisted action executed";
    }
}
```

### Access Control Modifiers - `onlyOwner()` and `onlyWhitelisted()`
Modifiers enforce who can call which function.
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

modifier onlyWhitelisted() {
    require(whitelist[msg.sender], "Not whitelisted");
    _;
}
```

### Functions

#### Write / Protected Functions

<Tabs groupId="access-control-write">
  <TabItem value="setWhitelisted" label="setWhitelisted" default>

`setWhitelisted(address,bool)`: Only the owner can update the whitelist. This emits an event so off-chain systems can track access changes.

```solidity
function setWhitelisted(address account, bool isWhitelisted) external onlyOwner {
    whitelist[account] = isWhitelisted;
    emit WhitelistUpdated(account, isWhitelisted);
}
```

  </TabItem>
  <TabItem value="transferOwnership" label="transferOwnership">

`transferOwnership(address)`: Transfers admin rights to a new owner (cannot be the zero address) and emits `OwnershipTransferred`.

```solidity
function transferOwnership(address newOwner) external onlyOwner {
    require(newOwner != address(0), "Zero address");
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
}
```

  </TabItem>
  <TabItem value="protectedAction" label="protectedAction">

`protectedAction()`: Restricted by `onlyWhitelisted`. This returns a string and does not write state, but **access is enforced**.

```solidity
function protectedAction() external onlyWhitelisted returns (string memory) {
    return "Whitelisted action executed";
}
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="access-control-read">
  <TabItem value="isWhitelisted" label="isWhitelisted" default>

`isWhitelisted(address)`: Check whether an account is allowed.

```solidity
function isWhitelisted(address account) external view returns (bool) {
    return whitelist[account];
}
```

  </TabItem>
  <TabItem value="owner" label="owner">

`owner()`: `owner` is a public variable, so Solidity generates a getter `owner()`.

```solidity
address public owner;
```

  </TabItem>
</Tabs>

### Events
Events track permission changes for auditability and off-chain monitoring.

- **`OwnershipTransferred(address indexed previousOwner, address indexed newOwner)`** - Emitted in the constructor and when `transferOwnership()` is called. The `indexed` keyword allows efficient filtering by owner address in event queries.
- **`WhitelistUpdated(address indexed account, bool isWhitelisted)`** - Emitted when `setWhitelisted()` is called. Records which account had its whitelist status changed and the new status (true = added, false = removed).

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, `OWNER_PRIVATE_KEY`, and `0xUser` with your own values.

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with no constructor args.</li>
      <li>Call <code>setWhitelisted(address,true)</code> as the owner.</li>
      <li>Call <code>protectedAction()</code> from a whitelisted account.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("OWNER_PRIVATE_KEY", provider);
const abi = [
  "function owner() view returns (address)",
  "function setWhitelisted(address account, bool isWhitelisted)",
  "function isWhitelisted(address account) view returns (bool)",
  "function protectedAction() returns (string)",
  "function transferOwnership(address newOwner)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.setWhitelisted("0xUser", true);
const ok = await contract.isWhitelisted("0xUser");
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("OWNER_PRIVATE_KEY", provider);
const abi = [
  "function owner() view returns (address)",
  "function setWhitelisted(address account, bool isWhitelisted)",
  "function isWhitelisted(address account) view returns (bool)",
  "function protectedAction() returns (string)",
  "function transferOwnership(address newOwner)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.setWhitelisted("0xUser", true);
const ok = await contract.isWhitelisted("0xUser");
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract (no constructor arguments):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract AccessControl {\n    address public owner;\n    mapping(address => bool) private whitelist;\n\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\n    event WhitelistUpdated(address indexed account, bool isWhitelisted);\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Not owner\");\n        _;\n    }\n\n    modifier onlyWhitelisted() {\n        require(whitelist[msg.sender], \"Not whitelisted\");\n        _;\n    }\n\n    constructor() {\n        owner = msg.sender;\n        emit OwnershipTransferred(address(0), msg.sender);\n    }\n\n    function transferOwnership(address newOwner) external onlyOwner {\n        require(newOwner != address(0), \"Zero address\");\n        emit OwnershipTransferred(owner, newOwner);\n        owner = newOwner;\n    }\n\n    function setWhitelisted(address account, bool isWhitelisted) external onlyOwner {\n        whitelist[account] = isWhitelisted;\n        emit WhitelistUpdated(account, isWhitelisted);\n    }\n\n    function isWhitelisted(address account) external view returns (bool) {\n        return whitelist[account];\n    }\n\n    function protectedAction() external onlyWhitelisted returns (string memory) {\n        return \"Whitelisted action executed\";\n    }\n}",
  "arguments": [],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: <code>isWhitelisted(address)</code> for verification.</p>

```json
{
  "abi": [
    "function setWhitelisted(address account, bool isWhitelisted)",
    "function isWhitelisted(address account) view returns (bool)"
  ],
  "to": "CONTRACT_ADDRESS",
  "method": "isWhitelisted",
  "arguments": ["0xUser"],
  "id": 1
}
```

    <p>Write: <code>setWhitelisted(address,bool)</code> by the owner.</p>

```json
{
  "abi": [
    "function setWhitelisted(address account, bool isWhitelisted)",
    "function isWhitelisted(address account) view returns (bool)"
  ],
  "to": "CONTRACT_ADDRESS",
  "method": "setWhitelisted",
  "arguments": ["0xUser", true],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem
    value="data_registry"
    label={<span style={{ whiteSpace: "pre-line" }}>{"Data Registry\n(Key-Value Store)"}</span>}
  >

### Overview
DataRegistry provides two flexible storage patterns in one contract: an address-based profile registry and a generic key/value store. It is useful for identity metadata, document hashes, or lightweight app configuration without involving any tokens.

### How It Works  
Each address can set its own profile string via `setProfile()`. Separately, anyone can write to the key/value store by supplying a `bytes32` key (often a hash) via `setValue()`. Both write paths emit events (`ProfileSet`, `KeyValueSet`) so the data can be indexed off-chain.

The contract uses two mappings: `profiles` maps addresses to profile strings (identity or metadata), while `kv` provides generic key/value storage for arbitrary entries. Read functions (`getProfile()`, `getValue()`) are `view` and return stored strings. The address registry pattern ensures callers can only change their own profile via `msg.sender`, while the key/value store allows any caller to write to any key.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DataRegistry {
    mapping(address => string) private profiles;
    mapping(bytes32 => string) private kv;

    event ProfileSet(address indexed account, string profile);
    event KeyValueSet(bytes32 indexed key, string value);

    function setProfile(string calldata profile) external {
        profiles[msg.sender] = profile;
        emit ProfileSet(msg.sender, profile);
    }

    function getProfile(address account) external view returns (string memory) {
        return profiles[account];
    }

    function setValue(bytes32 key, string calldata value) external {
        kv[key] = value;
        emit KeyValueSet(key, value);
    }

    function getValue(bytes32 key) external view returns (string memory) {
        return kv[key];
    }
}
```

### Functions

#### Write Functions

<Tabs groupId="data-registry-write">
  <TabItem value="setProfile" label="setProfile" default>

`setProfile(string)`: Each address can only set **its own** profile (`profiles[msg.sender]`) and emits `ProfileSet`.

```solidity
function setProfile(string calldata profile) external {
    profiles[msg.sender] = profile;
    emit ProfileSet(msg.sender, profile);
}
```

  </TabItem>
  <TabItem value="setValue" label="setValue">

`setValue(bytes32,string)`: This is a generic store: **anyone can set any key**. (If you need access control, combine with an owner/whitelist pattern.)

```solidity
function setValue(bytes32 key, string calldata value) external {
    kv[key] = value;
    emit KeyValueSet(key, value);
}
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="data-registry-read">
  <TabItem value="getProfile" label="getProfile" default>

`getProfile(address)`: Read an account's profile.

```solidity
function getProfile(address account) external view returns (string memory) {
    return profiles[account];
}
```

  </TabItem>
  <TabItem value="getValue" label="getValue">

`getValue(bytes32)`: Read a value by key.

```solidity
function getValue(bytes32 key) external view returns (string memory) {
    return kv[key];
}
```

  </TabItem>
</Tabs>

### Events
Events enable off-chain indexing and searching of registry data.

- **`ProfileSet(address indexed account, string profile)`** - Emitted when `setProfile()` is called. The `indexed` account parameter allows efficient filtering by address, making it easy to track all profile updates for a specific user.
- **`KeyValueSet(bytes32 indexed key, string value)`** - Emitted when `setValue()` is called. The `indexed` key parameter enables efficient queries by key hash, useful for tracking document hashes or configuration changes.

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, `YOUR_PRIVATE_KEY`, `0xUser`, and example keys with your own values.

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with no constructor args.</li>
      <li>Call <code>setProfile()</code> then <code>getProfile(address)</code>.</li>
      <li>Call <code>setValue(bytes32,string)</code> then <code>getValue(bytes32)</code>.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function setProfile(string profile)",
  "function getProfile(address account) view returns (string)",
  "function setValue(bytes32 key, string value)",
  "function getValue(bytes32 key) view returns (string)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.setProfile("alice@example.com");
const profile = await contract.getProfile(signer.address);
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function setProfile(string profile)",
  "function getProfile(address account) view returns (string)",
  "function setValue(bytes32 key, string value)",
  "function getValue(bytes32 key) view returns (string)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.setProfile("alice@example.com");
const profile = await contract.getProfile(signer.address);
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract (no constructor arguments):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract DataRegistry {\n    mapping(address => string) private profiles;\n    mapping(bytes32 => string) private kv;\n\n    event ProfileSet(address indexed account, string profile);\n    event KeyValueSet(bytes32 indexed key, string value);\n\n    function setProfile(string calldata profile) external {\n        profiles[msg.sender] = profile;\n        emit ProfileSet(msg.sender, profile);\n    }\n\n    function getProfile(address account) external view returns (string memory) {\n        return profiles[account];\n    }\n\n    function setValue(bytes32 key, string calldata value) external {\n        kv[key] = value;\n        emit KeyValueSet(key, value);\n    }\n\n    function getValue(bytes32 key) external view returns (string memory) {\n        return kv[key];\n    }\n}",
  "arguments": [],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: <code>getProfile</code> or <code>getValue</code>.</p>

```json
{
  "abi": ["function setProfile(string profile)", "function getProfile(address account) view returns (string)"],
  "to": "CONTRACT_ADDRESS",
  "method": "getProfile",
  "arguments": ["0xUser"],
  "id": 1
}
```

    <p>Write: <code>setProfile</code> or <code>setValue</code>.</p>

```json
{
  "abi": ["function setProfile(string profile)", "function setValue(bytes32 key, string value)"],
  "to": "CONTRACT_ADDRESS",
  "method": "setProfile",
  "arguments": ["alice@example.com"],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem
    value="state_events"
    label={<span style={{ whiteSpace: "pre-line" }}>{"State & Events\n(Audit Logs)"}</span>}
  >

### Overview
StateAndEvents demonstrates two critical patterns: controlled state transitions and an audit log. It combines a simple counter with a structured event trail to show how contracts can produce a reliable history of changes.

### How It Works  
The counter changes through `increment()` and `decrement()`, each emitting `CounterChanged`. The `decrement()` function includes a guard (`require(counter > 0)`) to prevent underflow. The audit log stores structured entries in an array (`auditLog`) and also emits an `AuditLogged` event so indexers can query efficiently by event while the chain retains a canonical storage record.

The contract uses a public `counter` state variable and a private `auditLog` array of `AuditEntry` structs. The `AuditEntry` struct captures who (`actor`), what (`action`), when (`timestamp`), and a value. State transitions (`increment()`, `decrement()`) emit events for off-chain tracking, while `logAction()` writes both to storage and emits an event. Read helpers (`getAuditCount()`, `getAuditEntry()`) provide access to the structured log data.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StateAndEvents {
    uint256 public counter;

    struct AuditEntry {
        address actor;
        string action;
        uint256 value;
        uint256 timestamp;
    }

    AuditEntry[] private auditLog;

    event CounterChanged(address indexed actor, uint256 oldValue, uint256 newValue);
    event AuditLogged(address indexed actor, string action, uint256 value, uint256 timestamp);

    function increment() external {
        uint256 oldValue = counter;
        counter += 1;
        emit CounterChanged(msg.sender, oldValue, counter);
    }

    function decrement() external {
        require(counter > 0, "Counter at zero");
        uint256 oldValue = counter;
        counter -= 1;
        emit CounterChanged(msg.sender, oldValue, counter);
    }

    function logAction(string calldata action, uint256 value) external {
        auditLog.push(AuditEntry(msg.sender, action, value, block.timestamp));
        emit AuditLogged(msg.sender, action, value, block.timestamp);
    }

    function getAuditCount() external view returns (uint256) {
        return auditLog.length;
    }

    function getAuditEntry(uint256 index)
        external
        view
        returns (address actor, string memory action, uint256 value, uint256 timestamp)
    {
        AuditEntry storage entry = auditLog[index];
        return (entry.actor, entry.action, entry.value, entry.timestamp);
    }
}
```

### Functions

#### Write Functions

<Tabs groupId="state-events-write">
  <TabItem value="increment" label="increment" default>

`increment()`: Increases the counter and emits `CounterChanged(oldValue, newValue)`.

```solidity
function increment() external {
    uint256 oldValue = counter;
    counter += 1;
    emit CounterChanged(msg.sender, oldValue, counter);
}
```

  </TabItem>
  <TabItem value="decrement" label="decrement">

`decrement()`: Decreases the counter with a guard (`counter > 0`) and emits `CounterChanged`.

```solidity
function decrement() external {
    require(counter > 0, "Counter at zero");
    uint256 oldValue = counter;
    counter -= 1;
    emit CounterChanged(msg.sender, oldValue, counter);
}
```

  </TabItem>
  <TabItem value="logAction" label="logAction">

`logAction(string,uint256)`: Appends an audit entry to storage **and** emits `AuditLogged` for efficient off-chain indexing.

```solidity
function logAction(string calldata action, uint256 value) external {
    auditLog.push(AuditEntry(msg.sender, action, value, block.timestamp));
    emit AuditLogged(msg.sender, action, value, block.timestamp);
}
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="state-events-read">
  <TabItem value="counter" label="counter" default>

`counter()`: `counter` is a public variable, so Solidity generates a getter `counter()`.

```solidity
uint256 public counter;
```

  </TabItem>
  <TabItem value="getAuditCount" label="getAuditCount">

`getAuditCount()`: Get the number of audit entries.

```solidity
function getAuditCount() external view returns (uint256) {
    return auditLog.length;
}
```

  </TabItem>
  <TabItem value="getAuditEntry" label="getAuditEntry">

`getAuditEntry(uint256)`: Read a specific audit entry by index.

```solidity
function getAuditEntry(uint256 index)
    external
    view
    returns (address actor, string memory action, uint256 value, uint256 timestamp)
{
    AuditEntry storage entry = auditLog[index];
    return (entry.actor, entry.action, entry.value, entry.timestamp);
}
```

  </TabItem>
</Tabs>

### Events
Events provide a searchable history of state changes and audit entries.

- **`CounterChanged(address indexed actor, uint256 oldValue, uint256 newValue)`** - Emitted by both `increment()` and `decrement()`. The `indexed` actor parameter allows filtering by who made the change, while oldValue and newValue show the state transition.
- **`AuditLogged(address indexed actor, string action, uint256 value, uint256 timestamp)`** - Emitted when `logAction()` is called. Provides a complete audit trail with who performed the action, what action was taken, the associated value, and when it occurred. The `indexed` actor enables efficient filtering by address.

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, and `YOUR_PRIVATE_KEY` with your own values.

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with no constructor args.</li>
      <li>Call <code>increment()</code> / <code>decrement()</code> to update state.</li>
      <li>Call <code>logAction()</code>, then <code>getAuditCount()</code> and <code>getAuditEntry()</code>.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function counter() view returns (uint256)",
  "function increment()",
  "function decrement()",
  "function logAction(string action, uint256 value)",
  "function getAuditCount() view returns (uint256)",
  "function getAuditEntry(uint256 index) view returns (address,string,uint256,uint256)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.increment();
await contract.logAction("user_login", 1);
const count = await contract.getAuditCount();
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function counter() view returns (uint256)",
  "function increment()",
  "function decrement()",
  "function logAction(string action, uint256 value)",
  "function getAuditCount() view returns (uint256)",
  "function getAuditEntry(uint256 index) view returns (address,string,uint256,uint256)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

await contract.increment();
await contract.logAction("user_login", 1);
const count = await contract.getAuditCount();
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract (no constructor arguments):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract StateAndEvents {\n    uint256 public counter;\n\n    struct AuditEntry {\n        address actor;\n        string action;\n        uint256 value;\n        uint256 timestamp;\n    }\n\n    AuditEntry[] private auditLog;\n\n    event CounterChanged(address indexed actor, uint256 oldValue, uint256 newValue);\n    event AuditLogged(address indexed actor, string action, uint256 value, uint256 timestamp);\n\n    function increment() external {\n        uint256 oldValue = counter;\n        counter += 1;\n        emit CounterChanged(msg.sender, oldValue, counter);\n    }\n\n    function decrement() external {\n        require(counter > 0, \"Counter at zero\");\n        uint256 oldValue = counter;\n        counter -= 1;\n        emit CounterChanged(msg.sender, oldValue, counter);\n    }\n\n    function logAction(string calldata action, uint256 value) external {\n        auditLog.push(AuditEntry(msg.sender, action, value, block.timestamp));\n        emit AuditLogged(msg.sender, action, value, block.timestamp);\n    }\n\n    function getAuditCount() external view returns (uint256) {\n        return auditLog.length;\n    }\n\n    function getAuditEntry(uint256 index)\n        external\n        view\n        returns (address actor, string memory action, uint256 value, uint256 timestamp)\n    {\n        AuditEntry storage entry = auditLog[index];\n        return (entry.actor, entry.action, entry.value, entry.timestamp);\n    }\n}",
  "arguments": [],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: <code>counter</code> or <code>getAuditCount</code>.</p>

```json
{
  "abi": ["function counter() view returns (uint256)", "function increment()"],
  "to": "CONTRACT_ADDRESS",
  "method": "counter",
  "arguments": [],
  "id": 1
}
```

    <p>Write: <code>increment</code> or <code>logAction</code>.</p>

```json
{
  "abi": ["function increment()", "function logAction(string action, uint256 value)"],
  "to": "CONTRACT_ADDRESS",
  "method": "logAction",
  "arguments": ["user_login", 1],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem
    value="governance"
    label={<span style={{ whiteSpace: "pre-line" }}>{"Governance\n(Voting)"}</span>}
  >

### Overview
Governance implements a simple, address-based voting system. Each address gets one vote per proposal, with a time window defined in blocks. It intentionally avoids token-weighted voting so it works in a gasless, token-free context.

### How It Works  
Creating a proposal via `createProposal()` sets its voting window (start and end blocks). Voters can cast a single vote during that window using `vote()`. The `hasVoted` mapping prevents double voting. After the end block, anyone can finalize the proposal with `execute()`, which records whether it passed (forVotes > againstVotes). This `execute()` is a **finalization step only**—it does not perform any external calls or execute arbitrary actions.

The contract uses a `Proposal` struct that stores metadata (`description`), voting window (`startBlock`, `endBlock`), vote counts (`forVotes`, `againstVotes`), and execution status. The `proposalCount` provides monotonically increasing proposal IDs. Lifecycle events (`ProposalCreated`, `VoteCast`, `ProposalExecuted`) track the proposal's state transitions for auditability.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Governance {
    struct Proposal {
        string description;
        uint256 startBlock;
        uint256 endBlock;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed proposalId, string description, uint256 startBlock, uint256 endBlock);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);

    function createProposal(string calldata description, uint256 votingPeriodBlocks)
        external
        returns (uint256 proposalId)
    {
        require(votingPeriodBlocks > 0, "Invalid voting period");
        proposalId = ++proposalCount;
        uint256 startBlock = block.number;
        uint256 endBlock = startBlock + votingPeriodBlocks;

        proposals[proposalId] = Proposal({
            description: description,
            startBlock: startBlock,
            endBlock: endBlock,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });

        emit ProposalCreated(proposalId, description, startBlock, endBlock);
    }

    function vote(uint256 proposalId, bool support) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage p = proposals[proposalId];
        require(block.number >= p.startBlock, "Voting not started");
        require(block.number <= p.endBlock, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            p.forVotes += 1;
        } else {
            p.againstVotes += 1;
        }

        emit VoteCast(proposalId, msg.sender, support);
    }

    function execute(uint256 proposalId) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage p = proposals[proposalId];
        require(block.number > p.endBlock, "Voting not ended");
        require(!p.executed, "Already executed");

        p.executed = true;
        emit ProposalExecuted(proposalId, p.forVotes > p.againstVotes);
    }
}
```

### Functions

#### Write Functions

<Tabs groupId="governance-write">
  <TabItem value="createProposal" label="createProposal" default>

`createProposal(string,uint256)`: Creates a new proposal with a block-based voting window and emits `ProposalCreated`.

```solidity
require(votingPeriodBlocks > 0, "Invalid voting period");
proposalId = ++proposalCount;
uint256 startBlock = block.number;
uint256 endBlock = startBlock + votingPeriodBlocks;

proposals[proposalId] = Proposal({
    description: description,
    startBlock: startBlock,
    endBlock: endBlock,
    forVotes: 0,
    againstVotes: 0,
    executed: false
});

emit ProposalCreated(proposalId, description, startBlock, endBlock);
```

  </TabItem>
  <TabItem value="vote" label="vote">

`vote(uint256,bool)`: Prevents double voting with `hasVoted[proposalId][msg.sender]` and emits `VoteCast`.

```solidity
require(!hasVoted[proposalId][msg.sender], "Already voted");
hasVoted[proposalId][msg.sender] = true;
emit VoteCast(proposalId, msg.sender, support);
```

  </TabItem>
  <TabItem value="execute" label="execute">

`execute(uint256)`: Finalizes the proposal and emits whether it passed. **It does not execute any external actions**.

```solidity
require(block.number > p.endBlock, "Voting not ended");
require(!p.executed, "Already executed");
p.executed = true;
emit ProposalExecuted(proposalId, p.forVotes > p.againstVotes);
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="governance-read">
  <TabItem value="proposals" label="proposals" default>

`proposals(uint256)`: `proposals` is a public mapping, so Solidity generates a getter `proposals(proposalId)`.

```solidity
mapping(uint256 => Proposal) public proposals;
```

  </TabItem>
  <TabItem value="hasVoted" label="hasVoted">

`hasVoted(uint256,address)`: Check if an address has voted on a proposal.

```solidity
mapping(uint256 => mapping(address => bool)) public hasVoted;
```

  </TabItem>
  <TabItem value="proposalCount" label="proposalCount">

`proposalCount()`: Get the latest proposal ID.

```solidity
uint256 public proposalCount;
```

  </TabItem>
</Tabs>

### Events
Events track the complete proposal lifecycle for transparency and auditability.

- **`ProposalCreated(uint256 indexed proposalId, string description, uint256 startBlock, uint256 endBlock)`** - Emitted when `createProposal()` is called. The `indexed` proposalId enables efficient filtering by proposal. Records the proposal description and voting window boundaries.
- **`VoteCast(uint256 indexed proposalId, address indexed voter, bool support)`** - Emitted when `vote()` is called. Both `proposalId` and `voter` are indexed for efficient queries. The `support` parameter indicates whether the vote was for (true) or against (false) the proposal.
- **`ProposalExecuted(uint256 indexed proposalId, bool passed)`** - Emitted when `execute()` is called. The `indexed` proposalId allows filtering by proposal. The `passed` boolean indicates whether the proposal succeeded (forVotes > againstVotes).

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, and `YOUR_PRIVATE_KEY` with your own values.

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with no constructor args.</li>
      <li>Call <code>createProposal("...", 100)</code> to open voting for 100 blocks.</li>
      <li>Call <code>vote(id, true/false)</code> from unique addresses.</li>
      <li>After the window closes, call <code>execute(id)</code>.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function proposalCount() view returns (uint256)",
  "function createProposal(string description, uint256 votingPeriodBlocks) returns (uint256)",
  "function vote(uint256 proposalId, bool support)",
  "function execute(uint256 proposalId)",
  "function proposals(uint256) view returns (string,uint256,uint256,uint256,uint256,bool)",
  "function hasVoted(uint256 proposalId, address voter) view returns (bool)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const tx = await contract.createProposal("Upgrade policy", 50);
await tx.wait();
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = [
  "function proposalCount() view returns (uint256)",
  "function createProposal(string description, uint256 votingPeriodBlocks) returns (uint256)",
  "function vote(uint256 proposalId, bool support)",
  "function execute(uint256 proposalId)",
  "function proposals(uint256) view returns (string,uint256,uint256,uint256,uint256,bool)",
  "function hasVoted(uint256 proposalId, address voter) view returns (bool)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const tx = await contract.createProposal("Upgrade policy", 50);
await tx.wait();
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract (no constructor arguments):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract Governance {\n    struct Proposal {\n        string description;\n        uint256 startBlock;\n        uint256 endBlock;\n        uint256 forVotes;\n        uint256 againstVotes;\n        bool executed;\n    }\n\n    uint256 public proposalCount;\n    mapping(uint256 => Proposal) public proposals;\n    mapping(uint256 => mapping(address => bool)) public hasVoted;\n\n    event ProposalCreated(uint256 indexed proposalId, string description, uint256 startBlock, uint256 endBlock);\n    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);\n    event ProposalExecuted(uint256 indexed proposalId, bool passed);\n\n    function createProposal(string calldata description, uint256 votingPeriodBlocks)\n        external\n        returns (uint256 proposalId)\n    {\n        require(votingPeriodBlocks > 0, \"Invalid voting period\");\n        proposalId = ++proposalCount;\n        uint256 startBlock = block.number;\n        uint256 endBlock = startBlock + votingPeriodBlocks;\n\n        proposals[proposalId] = Proposal({\n            description: description,\n            startBlock: startBlock,\n            endBlock: endBlock,\n            forVotes: 0,\n            againstVotes: 0,\n            executed: false\n        });\n\n        emit ProposalCreated(proposalId, description, startBlock, endBlock);\n    }\n\n    function vote(uint256 proposalId, bool support) external {\n        require(proposalId > 0 && proposalId <= proposalCount, \"Invalid proposal\");\n        Proposal storage p = proposals[proposalId];\n        require(block.number >= p.startBlock, \"Voting not started\");\n        require(block.number <= p.endBlock, \"Voting ended\");\n        require(!hasVoted[proposalId][msg.sender], \"Already voted\");\n\n        hasVoted[proposalId][msg.sender] = true;\n        if (support) {\n            p.forVotes += 1;\n        } else {\n            p.againstVotes += 1;\n        }\n\n        emit VoteCast(proposalId, msg.sender, support);\n    }\n\n    function execute(uint256 proposalId) external {\n        require(proposalId > 0 && proposalId <= proposalCount, \"Invalid proposal\");\n        Proposal storage p = proposals[proposalId];\n        require(block.number > p.endBlock, \"Voting not ended\");\n        require(!p.executed, \"Already executed\");\n\n        p.executed = true;\n        emit ProposalExecuted(proposalId, p.forVotes > p.againstVotes);\n    }\n}",
  "arguments": [],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: <code>proposals(id)</code> to inspect the state.</p>

```json
{
  "abi": ["function proposals(uint256) view returns (string,uint256,uint256,uint256,uint256,bool)"],
  "to": "CONTRACT_ADDRESS",
  "method": "proposals",
  "arguments": [1],
  "id": 1
}
```

    <p>Write: <code>createProposal</code> and <code>vote</code>.</p>

```json
{
  "abi": ["function createProposal(string description, uint256 votingPeriodBlocks) returns (uint256)"],
  "to": "CONTRACT_ADDRESS",
  "method": "createProposal",
  "arguments": ["Upgrade policy", 50],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem
    value="multisig"
    label={<span style={{ whiteSpace: "pre-line" }}>{"Multisig\n(Multi-Signature)"}</span>}
  >

### Overview
Multisig requires multiple owners to approve a transaction before execution. It is a safer governance and operations pattern for admin actions because a single key cannot act alone.

### How It Works  
An owner submits a transaction via `submit()` with a target address and calldata. Other owners approve it using `approve()`. The `approved` mapping tracks per-transaction, per-owner approvals. Once approvals meet the `required` threshold, any owner can execute the transaction via `execute()`, which performs a low-level call to the target function. Owners can also `revoke()` their approval before execution. The contract sets `executed = true` before the external call as a standard reentrancy mitigation.

The contract uses an `owners` array and `isOwner` mapping for authorization. The `onlyOwner` modifier gates all multisig functions. Transactions are stored in a `transactions` array, each containing the target (`to`), calldata (`data`), execution status (`executed`), and approval count (`approvals`). Lifecycle events (`Submit`, `Approve`, `Revoke`, `Execute`) track the transaction state.

### Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Multisig {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public required;

    struct Transaction {
        address to;
        bytes data;
        bool executed;
        uint256 approvals;
    }

    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public approved;

    event Submit(uint256 indexed txId, address indexed to, bytes data);
    event Approve(uint256 indexed txId, address indexed owner);
    event Revoke(uint256 indexed txId, address indexed owner);
    event Execute(uint256 indexed txId);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "No owners");
        require(_required > 0 && _required <= _owners.length, "Invalid required");
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Zero owner");
            require(!isOwner[owner], "Duplicate owner");
            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    function submit(address to, bytes calldata data) external onlyOwner returns (uint256 txId) {
        require(to != address(0), "Zero target");
        transactions.push(Transaction({to: to, data: data, executed: false, approvals: 0}));
        txId = transactions.length - 1;
        emit Submit(txId, to, data);
    }

    function approve(uint256 txId) external onlyOwner {
        Transaction storage txn = transactions[txId];
        require(!txn.executed, "Already executed");
        require(!approved[txId][msg.sender], "Already approved");
        approved[txId][msg.sender] = true;
        txn.approvals += 1;
        emit Approve(txId, msg.sender);
    }

    function revoke(uint256 txId) external onlyOwner {
        Transaction storage txn = transactions[txId];
        require(!txn.executed, "Already executed");
        require(approved[txId][msg.sender], "Not approved");
        approved[txId][msg.sender] = false;
        txn.approvals -= 1;
        emit Revoke(txId, msg.sender);
    }

    function execute(uint256 txId) external onlyOwner {
        Transaction storage txn = transactions[txId];
        require(!txn.executed, "Already executed");
        require(txn.approvals >= required, "Not enough approvals");
        txn.executed = true;
        (bool ok, ) = txn.to.call(txn.data);
        require(ok, "Call failed");
        emit Execute(txId);
    }
}
```

### Functions

#### Write Functions

<Tabs groupId="multisig-write">
  <TabItem value="submit" label="submit" default>

`submit(address,bytes)`: Creates a new transaction entry and emits `Submit`. `data` is the calldata you want the multisig to execute on `to`.

```solidity
require(to != address(0), "Zero target");
transactions.push(Transaction({to: to, data: data, executed: false, approvals: 0}));
txId = transactions.length - 1;
emit Submit(txId, to, data);
```

  </TabItem>
  <TabItem value="approve" label="approve">

`approve(uint256)`: Each owner can approve once; approvals are counted toward `required` and it emits `Approve`.

```solidity
require(!approved[txId][msg.sender], "Already approved");
approved[txId][msg.sender] = true;
txn.approvals += 1;
emit Approve(txId, msg.sender);
```

  </TabItem>
  <TabItem value="revoke" label="revoke">

`revoke(uint256)`: Allows an owner to withdraw their approval before execution and emits `Revoke`.

```solidity
require(approved[txId][msg.sender], "Not approved");
approved[txId][msg.sender] = false;
txn.approvals -= 1;
emit Revoke(txId, msg.sender);
```

  </TabItem>
  <TabItem value="execute" label="execute">

`execute(uint256)`: Executes the call after the approval threshold is met and emits `Execute`. Sets `executed = true` before the external call to prevent reentrancy.

```solidity
require(txn.approvals >= required, "Not enough approvals");
txn.executed = true;
(bool ok, ) = txn.to.call(txn.data);
require(ok, "Call failed");
emit Execute(txId);
```

  </TabItem>
</Tabs>

#### Read Functions

<Tabs groupId="multisig-read">
  <TabItem value="transactions" label="transactions" default>

`transactions(uint256)`: Inspect a transaction. `transactions` is a public array, so Solidity generates `transactions(txId)`.

`transactions` is a public array, so Solidity generates `transactions(txId)`.

```solidity
Transaction[] public transactions;
```

  </TabItem>
  <TabItem value="approved" label="approved">

`approved(uint256,address)`: Check if an owner approved a transaction.

```solidity
mapping(uint256 => mapping(address => bool)) public approved;
```

  </TabItem>
  <TabItem value="config" label="Config getters">

`required()`, `owners(uint256)`, `isOwner(address)`: Inspect multisig configuration.

```solidity
address[] public owners;
mapping(address => bool) public isOwner;
uint256 public required;
```

  </TabItem>
</Tabs>

### Events
Events track the complete transaction lifecycle through the multisig workflow.

- **`Submit(uint256 indexed txId, address indexed to, bytes data)`** - Emitted when `submit()` is called. The `indexed` txId and `to` parameters enable efficient filtering by transaction ID or target address. Records the transaction target and calldata.
- **`Approve(uint256 indexed txId, address indexed owner)`** - Emitted when `approve()` is called. Both `indexed` parameters allow filtering by transaction or owner, making it easy to track which owners approved which transactions.
- **`Revoke(uint256 indexed txId, address indexed owner)`** - Emitted when `revoke()` is called. Tracks when an owner withdraws their approval before execution, useful for monitoring approval changes.
- **`Execute(uint256 indexed txId)`** - Emitted when `execute()` successfully completes. The `indexed` txId enables efficient queries to find all executed transactions. This event confirms the transaction was executed after meeting the approval threshold.

### How to Deploy/Interact

Replace placeholders like `YOUR_RPC_URL`, `CONTRACT_ADDRESS`, `OWNER_PRIVATE_KEY`, `TARGET_CONTRACT`, and `0xCALLDATA` with your own values. (`0xCALLDATA` is the ABI-encoded calldata for the target call.)

<Tabs>
  <TabItem value="remix" label="Remix (Deploy)" default>
    <ul>
      <li>Deploy with a list of owners and a required threshold.</li>
      <li>Submit a transaction with target + calldata.</li>
      <li>Have other owners approve, then execute.</li>
    </ul>
  </TabItem>
  <TabItem value="ethers-v6" label="Ethers.js V6 (Interact)">

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("OWNER_PRIVATE_KEY", provider);
const abi = [
  "function required() view returns (uint256)",
  "function owners(uint256) view returns (address)",
  "function isOwner(address) view returns (bool)",
  "function submit(address to, bytes data) returns (uint256)",
  "function approve(uint256 txId)",
  "function revoke(uint256 txId)",
  "function execute(uint256 txId)",
  "function transactions(uint256) view returns (address,bytes,bool,uint256)",
  "function approved(uint256 txId, address owner) view returns (bool)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const txId = await contract.submit("TARGET_CONTRACT", "0xCALLDATA");
await contract.approve(txId);
```

  </TabItem>
  <TabItem value="ethers-v5" label="Ethers.js V5 (Interact)">

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
const signer = new ethers.Wallet("OWNER_PRIVATE_KEY", provider);
const abi = [
  "function required() view returns (uint256)",
  "function owners(uint256) view returns (address)",
  "function isOwner(address) view returns (bool)",
  "function submit(address to, bytes data) returns (uint256)",
  "function approve(uint256 txId)",
  "function revoke(uint256 txId)",
  "function execute(uint256 txId)",
  "function transactions(uint256) view returns (address,bytes,bool,uint256)",
  "function approved(uint256 txId, address owner) view returns (bool)"
];
const contract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);

const txId = await contract.submit("TARGET_CONTRACT", "0xCALLDATA");
await contract.approve(txId);
```

  </TabItem>
  <TabItem value="zkt-deploy" label="ZktV2Contract (Deploy)">
    <p>Deploy the contract with constructor arguments (owners array and required threshold):</p>

```json
{
  "code": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.24;\n\ncontract Multisig {\n    address[] public owners;\n    mapping(address => bool) public isOwner;\n    uint256 public required;\n\n    struct Transaction {\n        address to;\n        bytes data;\n        bool executed;\n        uint256 approvals;\n    }\n\n    Transaction[] public transactions;\n    mapping(uint256 => mapping(address => bool)) public approved;\n\n    event Submit(uint256 indexed txId, address indexed to, bytes data);\n    event Approve(uint256 indexed txId, address indexed owner);\n    event Revoke(uint256 indexed txId, address indexed owner);\n    event Execute(uint256 indexed txId);\n\n    modifier onlyOwner() {\n        require(isOwner[msg.sender], \"Not owner\");\n        _;\n    }\n\n    constructor(address[] memory _owners, uint256 _required) {\n        require(_owners.length > 0, \"No owners\");\n        require(_required > 0 && _required <= _owners.length, \"Invalid required\");\n        for (uint256 i = 0; i < _owners.length; i++) {\n            address owner = _owners[i];\n            require(owner != address(0), \"Zero owner\");\n            require(!isOwner[owner], \"Duplicate owner\");\n            isOwner[owner] = true;\n            owners.push(owner);\n        }\n        required = _required;\n    }\n\n    function submit(address to, bytes calldata data) external onlyOwner returns (uint256 txId) {\n        require(to != address(0), \"Zero target\");\n        transactions.push(Transaction({to: to, data: data, executed: false, approvals: 0}));\n        txId = transactions.length - 1;\n        emit Submit(txId, to, data);\n    }\n\n    function approve(uint256 txId) external onlyOwner {\n        Transaction storage txn = transactions[txId];\n        require(!txn.executed, \"Already executed\");\n        require(!approved[txId][msg.sender], \"Already approved\");\n        approved[txId][msg.sender] = true;\n        txn.approvals += 1;\n        emit Approve(txId, msg.sender);\n    }\n\n    function revoke(uint256 txId) external onlyOwner {\n        Transaction storage txn = transactions[txId];\n        require(!txn.executed, \"Already executed\");\n        require(approved[txId][msg.sender], \"Not approved\");\n        approved[txId][msg.sender] = false;\n        txn.approvals -= 1;\n        emit Revoke(txId, msg.sender);\n    }\n\n    function execute(uint256 txId) external onlyOwner {\n        Transaction storage txn = transactions[txId];\n        require(!txn.executed, \"Already executed\");\n        require(txn.approvals >= required, \"Not enough approvals\");\n        txn.executed = true;\n        (bool ok, ) = txn.to.call(txn.data);\n        require(ok, \"Call failed\");\n        emit Execute(txId);\n    }\n}",
  "arguments": [["0xOwner1", "0xOwner2", "0xOwner3"], 2],
  "id": 1
}
```

  </TabItem>
  <TabItem value="zkt-interact" label="ZktV2Simple (Interact)">
    <p>Read: <code>transactions(id)</code> to inspect state.</p>

```json
{
  "abi": ["function transactions(uint256) view returns (address,bytes,bool,uint256)"],
  "to": "CONTRACT_ADDRESS",
  "method": "transactions",
  "arguments": [0],
  "id": 1
}
```

    <p>Write: <code>submit</code> and <code>approve</code>.</p>

```json
{
  "abi": ["function submit(address to, bytes data) returns (uint256)"],
  "to": "CONTRACT_ADDRESS",
  "method": "submit",
  "arguments": ["TARGET_CONTRACT", "0xCALLDATA"],
  "id": 2
}
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>
