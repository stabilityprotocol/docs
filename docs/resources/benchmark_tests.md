---
sidebar_position: 3
---

# Benchmark Tests

The benchmark tests presented here offer an evaluation of Stability Testnet and Global Trust Network (GTN) in regards to latency and throughput. These tests have been designed to simulate real-world transaction loads.

These tests occurred on March 11th, 2024 for Testnet, and March 12th, 2024 for GTN. Both networks are capable to scale for larger throughput as demand increases. 

## Parameters

| Metric                       | Description |
|------------------------------|-------------|
| Transactions Per Second (TPS) | This metric indicates the number of transactions the network can handle in one second. Varying this parameter helps in assessing the network's scalability and throughput. |
| Gas Per Transaction          | Represents the amount of computational effort required to execute a transaction in units of wei. |
| Average Block Time           | The average time taken to mine a block. This is a critical measure of the network's latency and responsiveness. |
| Total Block Gas              | The cumulative gas used by all transactions in a block. This metric gives an overview of the block's capacity utilization. |
| Max Transactions Per Block   | The maximum number of transactions that can be included in a single block, which is directly influenced by the block gas limit and the gas used per transaction. |

## Testnet Results

| TRANSACTIONS PER SECOND | GAS PER TRANSACTION | TOTAL BLOCK GAS | MAX TRANSACTIONS PER BLOCK | LINK |
|-------------------------|---------------------|-----------------|----------------------------|------|
| 100.00                  | 1,000,000.00        | 213,270,338.00  | 220                    | [Link](https://stability-testnet.blockscout.com/block/315241) |
| 100.00                  | 50,000.00           | 16,256,356.00   | 397                    | [Link](https://stability-testnet.blockscout.com/block/344142) |
| 150.00                  | 100,000.00          | 107,621,286.00  | 1,200                  | [Link](https://stability-testnet.blockscout.com/block/344229) |
| 75.00                   | 200,000.00          | 144,461,401.00  | 765                    | [Link](https://stability-testnet.blockscout.com/block/344239) |
| 75.00                   | 300,000.00          | 104,325,877.00  | 361                    | [Link](https://stability-testnet.blockscout.com/block/345093) |
| 75.00                   | 500,000.00          | 192,152,494.00  | 393                    | [Link](https://stability-testnet.blockscout.com/block/345214) |
| 150.00                  | 500,000.00          | 164,829,733.00  | 342                    | [Link](https://stability-testnet.blockscout.com/block/345289) |
| 150.00                  | 1,000,000.00        | 160,541,685.00  | 189                    | [Link](https://stability-testnet.blockscout.com/block/345303) |
| 225.00                  | 1,000,000.00        | 296,552,763.00  | 305                    | [Link](https://stability-testnet.blockscout.com/block/345376) |

## Global Trust Network (GTN) Results

| TRANSACTIONS PER SECOND | GAS PER TRANSACTION | TOTAL BLOCK GAS | MAX TRANSACTIONS PER BLOCK | LINK |
|-------------------------|---------------------|-----------------|----------------------------|------|
| 100.00                  | 1,000,000.00        | 299,310,992     | 302                        | [Link](https://stability.blockscout.com/block/354698) |
| 100.00                  | 50,000.00           | 14,905,072      | 364                        | [Link](https://stability.blockscout.com/block/354776) |
| 150.00                  | 100,000.00          | 75,705,344      | 832                        | [Link](https://stability.blockscout.com/block/354914) |
| 75.00                   | 200,000.00          | 43,942,880      | 230                        | [Link](https://stability.blockscout.com/block/354966) |
| 75.00                   | 300,000.00          | 103,056,480     | 354                        | [Link](https://stability.blockscout.com/block/355006) |
| 75.00                   | 500,000.00          | 171,445,552     | 349                        | [Link](https://stability.blockscout.com/block/355037) |
| 150.00                  | 500,000.00          | 299,661,280     | 610                        | [Link](https://stability.blockscout.com/block/355088) |
| 150.00                  | 1,000,000.00        | 299,310,992     | 302                        | [Link](https://stability.blockscout.com/block/355135) |