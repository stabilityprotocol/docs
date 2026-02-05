---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Checking Transaction Status

After submitting a ZKT transaction, you may want to verify its status and retrieve transaction details. This is especially useful for monitoring **asynchronous transactions** and ensuring they have been successfully processed on the blockchain.

- Verify that your transaction has been successfully processed
- Retrieve the on-chain transaction hash for blockchain explorers
- Debug any errors that may have occurred during processing
- Track the timestamp of when your transaction was created and processed

## Endpoint

To check the status of a ZKT transaction, send a `HTTP GET` request to:

```
GET https://api.stabilityprotocol.com/gtn/v1/zkt/transaction/{queueId}
```

When you submit a ZKT transaction, the API returns a `queueId` in the response. This identifier is used to track your transaction through the processing queue.

For example, when you submit a transaction, you might receive:
```json
{
  "queueId": "98a793a2-f8df-454f-90f5-681f3e9fc7c9"
}
```

Replace `{queueId}` with the queue ID you received from your initial ZKT transaction to check the transaction status

## Request Example

<Tabs groupId="os">
  <TabItem value="unix" label="Linux/macOS" default>

```bash
curl -X GET "https://api.stabilityprotocol.com/gtn/v1/zkt/transaction/98a793a2-f8df-454f-90f5-681f3e9fc7c9" \
-H "Content-Type: application/json"
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
curl -X GET "https://api.stabilityprotocol.com/gtn/v1/zkt/transaction/98a793a2-f8df-454f-90f5-681f3e9fc7c9" -H "Content-Type: application/json"
```

  </TabItem>
</Tabs>

## Response Fields

The response format varies depending on the transaction status:

| Field              | Type   | Description                                                                 | Appears When           |
|--------------------|--------|-----------------------------------------------------------------------------|------------------------|
| `status`           | string | Current status: `pending`, `processing`, `completed`, or `error`.          | All statuses           |
| `queueId`          | string | Unique identifier for the transaction in the processing queue.              | All statuses           |
| `transactionHash`  | string | The on-chain transaction hash.                                             | `completed` only       |
| `errorMessage`     | string | Error details describing what went wrong.                                  | `error` only           |
| `createdAt`        | string | ISO 8601 timestamp of when the transaction was submitted.                  | `completed`, `error`   |
| `processedAt`      | string | ISO 8601 timestamp of when the transaction was processed.                  | `completed` only       |

## Response Examples

<Tabs>
  <TabItem value="completed" label="Completed Status" default>

When the transaction has been successfully processed:

```json
{
    "queueId": "98a793a2-f8df-454f-90f5-681f3e9fc7c9",
    "status": "completed",
    "transactionHash": "0x6caac320855880061c105c83b51b09a1e30331efebcae9d2a2b2b5f80f8a1bbe",
    "errorMessage": null,
    "createdAt": "2026-01-20T07:57:35.220Z",
    "processedAt": "2026-01-20T07:57:38.295Z"
}
```

  </TabItem>
  
  <TabItem value="error" label="Error Status">

When the transaction encounters an error you can expect these fields in the response:

```json
{
  "status": "error",
  "queueId": "3c9d2ec0-e24c-41be-9f37-d348f6027c1b",
  "errorMessage": "reason why the transaction failed",
  "createdAt": "2026-01-27T03:27:44.329Z"
}
```

If the requested transaction cannot be found, the API will respond with:

```json
{
  "error": "Transaction not found"
}
```

  </TabItem>
  
  <TabItem value="pending" label="Pending/Processing Status">

When the transaction is still being processed:

```json
{
  "status": "pending",
  "queueId": "98a793a2-f8df-454f-90f5-681f3e9fc7c9"
}
```

or

```json
{
  "status": "processing",
  "queueId": "98a793a2-f8df-454f-90f5-681f3e9fc7c9"
}
```

  </TabItem>
</Tabs>

## Understanding Status Values

| Status       | Description                                                                      |
|--------------|----------------------------------------------------------------------------------|
| `pending`    | The transaction is queued and waiting to be processed.                           |
| `processing` | The transaction is currently being processed.                                    |
| `completed`  | The transaction has been successfully processed and confirmed on the blockchain. |
| `error`      | The transaction encountered an error during processing.                         |

## Next Steps

Now that you understand how to submit transactions and monitor their status, you can:

- Explore the [Stability Portal](https://account.stabilityprotocol.com/keys) to manage your API keys
- Check out the [Stability Publisher](https://github.com/stabilityprotocol/stability-publisher-dapp) repository for more examples
- View your transactions on the blockchain explorers:
  - [GTN Explorer](https://stability.blockscout.com/)
  - [Testnet Explorer](https://explorer.stble.io/testnet/)
