---
sidebar_position: 2
---

# Token Gating (Beta)

## Overview

**Token Gating** in STABILITY refers to the system that allows transaction fees to be paid in multiple ERC-20 tokens instead of a single native coin. Unlike most blockchains, STABILITY has no native gas token — it doesn’t issue a built-in currency for fees. Instead, users can choose a supported ERC-20 token to pay fees, and validators choose which of those tokens they will accept as payment. This design effectively “decentralizes” the native token, making approved tokens function as gas currency.

The economic rationale is to improve usability and composability: projects can use their own token or stablecoins to cover transaction fees, eliminating the need for a separate gas coin. This enables a form of native token abstraction—from a user’s perspective, they pay gas in a token they already hold (e.g., USDC), rather than acquiring a separate coin or interfacing with STABILITY directly.

Despite the flexibility of multi-token fees, STABILITY still supports a public mempool. This is made possible by globally whitelisting the tokens validators can accept for fees—nodes only propagate transactions that use approved tokens. By gating the mempool to accepted tokens, STABILITY prevents spam transactions using worthless tokens while still offering flexibility to users and dApps.

In short, token gating allows public EVM transactions to occur without a native coin by enabling users to pay in whitelisted tokens and aligning validator incentives around those tokens. Validators earn fees in those tokens, and users benefit from a seamless experience.

Notably, users leveraging the Zero Gas Transaction or ZKT framework can bypass the use of gas tokens altogether.

## How It Works

### Whitelisted Fee Tokens

The set of tokens that can be used to pay fees is controlled by a whitelist called the **Supported Tokens List**. Only tokens on this approved list will be recognized for gas payment. If a token is not whitelisted, users cannot select it for fees. Any transaction attempting to use an unapproved token will be rejected or never included in a block. This ensures all fee tokens have been vetted by the STABILITY team. The list is updated by admins via the `SupportedTokensManager` precompile [(Code)](https://github.com/stabilityprotocol/stability/blob/main/precompiles/token-fee-controller/supported-tokens-manager/SupportedTokensManager.sol) to add or remove allowed tokens​. A default token is designated on this list – if a user does not explicitly choose a fee token, the network will use the default​ for ATM transactions.

### User Fee Token Selection

Each user can select which whitelisted token they wish to use to pay transaction fees. The user signals their choice by calling a precompiled contract function. STABILITY provides the `Fee Token Selector` precompile [(Code)](https://github.com/stabilityprotocol/stability/blob/main/precompiles/token-fee-controller/fee-token-selector/FeeTokenSelector.sol) for this purpose​.

By calling `FeeTokenSelector.setFeeToken(address tokenAddress)`, a user sets their preferred fee token. The chosen token must be one of the whitelisted tokens, otherwise the call will fail. If successful, the user’s preference is recorded on-chain and mapped to the user’s address. From that point on, any transaction sent via ATM by the user will be charged in the selected token. Users can query their current setting via `FeeTokenSelector.getFeeToken(address user)`, which returns the token address they have selected​. If a user never calls `setFeeToken`, the system assumes the default token for their ATM transactions​. Users may update their fee token selection at any time by calling `setFeeToken` again with a different allowed token.

### Validator Token Selection

For validators, each validator declares which of the whitelisted tokens they are willing to accept as gas payment. Validators use the `Validator Fee Token Selector` precompile [(Code)](https://github.com/stabilityprotocol/stability/blob/main/precompiles/token-fee-controller/validator-fee-selector/ValidatorFeeTokenSelector.sol) to manage their accepted tokens and fee conversion settings​.

A validator calls `ValidatorFeeTokenSelector.setTokenAcceptance(address token, bool acceptance)` to indicate whether they accept a particular token as fees​. By default, a new validator is configured to accept the default token only​. They must explicitly opt in to each additional token they wish to collect fees in. If a validator has not accepted a certain token, that validator will not include transactions that pay fees in that token.

### Fee Matching and Mempool Gating

When a user submits a transaction, the gas fee token address is not included in the transaction data. Instead, the network implicitly knows which token to use from the user’s stored preference. The transaction is propagated in the public mempool only if its fee token is on the global whitelist. Each validator’s mempool will filter or ignore transactions that use tokens the validator doesn’t accept.

In addition, to execute, the maxFeePerGas parameter set up by the user must meet the minimum the validator the validator will accept for this transaction. When a user sets their `base_Fee`. This dived into deeper in the next section.

In practice, a transaction paying with token X will only be picked up by validators who have set acceptance for X **_and_** and at the price point the validator will accept. If a validator that doesn’t support token X receives the transaction, or the transaction is underpriced, the validator will not include the transaction in a block. The transaction waits in the mempool until a compatible validator is the one to produce a block.

### Transaction Execution and Conversion

Once a validator that supports the user’s fee token is producing a block, the transaction can be executed. STABILITY’s runtime still uses the EVM to execute transactions, but because there is no native currency, the gas price fields are handled differently.

This zero native gas price is possible because the network doesn’t charge any native coin during execution. Instead of charging native gas during execution, the protocol calculates the fee in the user’s chosen token after the transaction is run. Each validator has an associated `Conversion Rate Manager` contract which determines how to convert the abstract gas usage into an ERC-20 token amount​.

Validators set the address of its conversion contract via `ValidatorFeeTokenSelector.updateConversionRateController(address controller)​`. This is typically set to a default contract used by all validators, unless a validator chooses a custom strategy.

The conversion manager implements

```
`getConversionRate(address sender, address validator, address token) returns (uint256, uint256)​`
```

This function called by the runtime for each transaction to fetch the conversion rate. The conversion rate is a factor that translates the network’s internal gas units into actual token amount. In simpler terms, it’s akin to a price or exchange rate for the fee token, where a each individual sets their own conversion rate, and the validator sets the conversion rate they will accept to process the transaction.

Put more simply, this function returns a conversion rate (e.g., as a numerator and denominator pair) that translates internal gas units into a fee amount in the specified token.

### Example: Token Conversion Fee

For example, suppose the network’s internal gas unit is notionally priced at 1 gwei, and the validator’s conversion rate for USDC is set to 5x. This 5x represents a price of 5 gwei. In this case, the effective gas price in USDC would be calculated as: gas_price_token = 1 \* 5 / 1e18 ≈ 5e-8 USDC per gas unit​. Let's assume USDC has 18 decimals, the transaction used 100,000 gas. The transaction contained no priority fee, as it is always ignored.

```
total_fee = gas_used * base_gas_price * conversion_rate
          = 100,000 * 1 gwei * 5 / 1e18
          = 100,000 * (5e-9 USDC)
          = 0.0005 USDC.
```

Let's assume we want to use a token that is of a higher value. Let's assume we want to use MUFFIN token. Validators are willing to process transactions with a conversion rate of 0.1x. Again, this 0.1x represents a price of 0.1 gwei. Let's use the same parameters - we'll assume MUFFIN has 18 decimals and the transaction used 100,000 gas. The priority fee is always ignored.

```
total_fee = gas_used * base_gas_price * conversion_rate
          = 100,000 * 1 gwei * 0.1 / 1e18
          = 100,000 * (0.1e-9 MUFFIN)
          = 0.00001 MUFFIN.
```

In STABILITY’s current implementation of ATM, `baseFee + priorityFee` is effectively constant at 1 for `baseFee` and 0 for `priorityFee`, since the chain doesn’t update a base fee per block as Ethereum does. This means the conversion rate directly determines the fee level. The `Conversion Rate Manager` returns a pair of values (numerator/denominator or similar) that the runtime uses to compute the multiplier for the token​. The protocol then charges the fee in the token by transferring tokens from the user to the validator upon transaction inclusion.

## Fee Distribution and BSR

After fee conversion, STABILITY's fee distribution logic. The fee amount in the token is deducted from the user’s balance. The fee is split between the validator and the smart contract (dApp) that was called, according to the `Business Share Revenue (BSR)` rules. In practice, the validator’s portion of the fee goes to the validator’s account, and the dApp’s portion is deposited into the BSR vault to be claimed by the contract owner in the same token that was used to pay​ gas fees.

For example, if a user pays 0.05 USDC in gas fees on a swap contract and the BSR split is 50/50, the validator gets 0.025 USDC and the contract’s BSR vault accrues 0.025 USDC for the dApp developer. The fee token gating system works seamlessly with BSR: the vault holds balances in multiple tokens. Developers can query and claim rewards per token using `getClaimableReward(dapp, token)` and `claimReward(dapp, token)` on the `FeeRewardsVault` precompile [(Code)](https://github.com/stabilityprotocol/stability/blob/896c16bbdd1d2c0a241d945f5f42b00f00d3caff/precompiles/fee-rewards-vault-controller/FeeRewardsVaultController.sol#L4).

Whatever token the user pays in, that same token is distributed as a reward — no currency conversion is performed.

### Mempool Inclusion Dynamics

Because not all validators may accept every token, a user’s chosen fee token can affect how quickly their transaction gets picked up. If a token is universally accepted, every block producer will include transactions with that token if the transaction is not underpriced, so the experience is similar to a normal gas coin.

If a token is less widely accepted – say only 20% of validators opt in – then a transaction paying with that token will only be included by those 20% of blocks. This means an effective slowdown in confirmation time. In this example, if blocks come every 2 seconds normally, a 20% acceptance rate would mean a maximum wait of 5x, or ~10 seconds for a transaction to be included​.

The more validators support a token, the smoother and faster the user’s transactions will be. This also puts downward market pressure on the conversion rate of the token. If no active validator supports the token, the transaction will never be executed. The transaction will remain pending until it times out or the user cancels it by changing fee token, underscoring the importance of using well-supported tokens.

In other words, the token gating system involves a handshake between user preferences and validator policies: users pick a token from the allowed list and validators indicate which tokens they’ll take and what rate they will accept it. The network only processes the transaction when there’s a match, then uses the validator’s conversion rate to charge the fee in that token. All of this occurs at the protocol level, allowing a user to effectively use a preferred token as the “native gas” for that transaction.
