---
sidebar_position: 8
---

# Precompiles

## What are Precompiles?

A precompile refers to a set of special, pre-defined functions built into the native blockchain client software. In other words, precompiles are native smart contracts.

Precompiles are accessible at specific addresses on the blockchain and are designed to perform complex cryptographic operations such as hashing, digital signature verification, and mathematical operations more efficiently.

Blockchains deploy precompiled contracts for two main reasons. First, if the contracts are integral to the functioning of the blockchain itself, then it is vital that every instance of the blockchain contains these smart contracts. Secondly, precompiled contracts are far more efficient for certain operations.

## Interacting With Precompiles

To interact with a precompile contract, simply treat the precompile contract as if it was any other smart contract. Stability has their own precompile contracts on our network to manage permissioned validators, as well as standard Ethereum Virtual Machine (EVM) precompiles.

## Stability Native Precompiles

Stability
| Address | Name | Input | Output | Description | Source |
|---------|-----------|------------------------------|--------------|-----------------------------------------------------------------------------|----------------------------|
| 0x802 | FeeTokenSelector | data | data | A precompile that allows users to set their fee token. | [Code](https://github.com/stabilityprotocol/stability/blob/main/precompiles/token-fee-controller/fee-token-selector/FeeTokenSelector.sol) |
| 0x803 | ValidatorFeeTokenSelector | data | data | A precompile that allows Validators that select which tokens to accept. | [Code](https://github.com/stabilityprotocol/stability/blob/main/precompiles/token-fee-controller/validator-fee-selector/ValidatorFeeTokenSelector.sol) |
| 0x805 | ValidatorController | data | data | A precompile that enables Stability to manage validator addresses. | [Code](https://github.com/stabilityprotocol/stability/blob/main/precompiles/upgrade-runtime-controller/UpgradeRuntimeController.sol) |
| 0x806 | UpgradeRuntimeControllerPrecompile | data | data | A precompile that enables Stability to manage runtime upgrades.| [Code](https://github.com/stabilityprotocol/stability/blob/main/precompiles/upgrade-runtime-controller/UpgradeRuntimeController.sol) |
| 0x807 | FeeRewardsVaultController | data | data | A precompile that enables fee-sharing logic for the ATM.| [Code](https://github.com/stabilityprotocol/stability/blob/main/precompiles/fee-rewards-vault-controller/FeeRewardsVaultController.sol) |

## Ethereum Native Precompiles

To Learn More About Ethereum Precompile Contracts, we highly recommend visiting [EVM Codes](https://www.evm.codes/precompiled?fork=shanghai)

| Address | Name               | Input                        | Output        | Description                                                                                                                                                                                                                                                                               |
| ------- | ------------------ | ---------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecRecover          | hash, v, r, s                | publicAddress | Verify the signature of a message. In other words, you feed ecrecover the transaction's signature values and it returns an address. The signature is verified if the address returned is the same as the public address that sent the transaction.                                        |
| 0x02    | SHA2-256           | data                         | hash          | Returns the SHA256 hash from the given data.                                                                                                                                                                                                                                              |
| 0x03    | RIPEMD-160         | data                         | hash          | Returns the RIPEMD160 hash from the given data.                                                                                                                                                                                                                                           |
| 0x04    | identity           | data                         | data          | Also known as `datacopy`, this precompile serves as a cheaper way to copy data in memory.                                                                                                                                                                                                 |
| 0x05    | modexp             | Bsize, Esize, Msize, B, E, M | value         | Calculates the remainder when an integer `b` (base) is raised to the `e`-th power (the exponent), and is divided by a positive integer `m` (the modulus).                                                                                                                                 |
| 0x06    | BN128Add           | x1, y1, x2, y2               | x, y          | Implements a native elliptic curve point addition. Returns an elliptic curve point representing `(ax, ay) + (bx, by)` such that `(ax, ay)` and `(bx, by)` are valid points on the curve BN256.                                                                                            |
| 0x07    | BN128Mul           | x1, y1, s                    | x, y          | Implements a native elliptic curve multiplication with a scalar value. Returns an elliptic curve point representing `scalar * (x, y)` such that `(x, y)` is a valid curve point on the curve BN256.alt_bn128                                                                              |
| 0x08    | BN128Pairing       | x1, y1, x2, y2, ..., xk, yk  | success       | Implements elliptic curve pairing operation to perform zkSNARK verification.alt_bn128                                                                                                                                                                                                     |
| 0x09    | Blake2             | rounds, h, m, t, f           | h             | Implements the BLAKE2b hash function and other higher-round 64-bit BLAKE2 variants to run cheaply on the EVM.                                                                                                                                                                             |
| 0x400   | SHA3FIPS256        | data                         | hash          | Implements the SHA-3 (Secure Hash Algorithm 3) cryptographic hashing function as specified in FIPS 202 (Federal Information Processing Standards Publication). This precompile takes an arbitrary length input and processes it to produce a fixed-length 256-bit (32 bytes) output hash. |
| 0x402   | ECRecoverPublicKey | hash, v, r, s                | hash          | Similar to ecRecover, but returns the pubkey (not the corresponding Ethereum address)                                                                                                                                                                                                     |
