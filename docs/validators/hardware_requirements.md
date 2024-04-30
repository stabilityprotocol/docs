---
sidebar_position: 1
---

# Hardware Requirements

Stability uses Tendermint as its blockchain framework. We strongly advise to use the appropriate hardware for secure and efficient participation in the network. These recommendations provided aim to ensure maximum uptime and performance.

## Tendermint Requirements

Below are the minimum and recommended hardware specifications for running a node or validator on the Stability network using Tendermint:

| **Component** | **Requirement Type** | **Specification**                                         |
|---------------|----------------------|-----------------------------------------------------------|
| **CPU**       | Minimum              | Quad-core processor, 2.0 GHz or higher                   |
|               | Recommended          | Modern 8-core processor, 3.0 GHz or higher (e.g., Intel i7, AMD Ryzen 7) |
| **Memory**    | Minimum              | 16 GB RAM                                                 |
|               | Recommended          | 32 GB RAM or more                                         |
| **Storage**   | Type                 | SSD (Solid State Drive)                                   |
|               | Minimum              | 500 GB SSD                                                |
|               | Recommended          | 1 TB SSD or more, high endurance and performance (e.g., NVMe) |
| **Networking**| Internet Connection  | Stable, high-speed internet with a minimum of 100 Mbps dedicated bandwidth |
|               | Recommended          | 1 Gbps or higher dedicated bandwidth                      |

## AWS Recommendations

For hosting nodes and validators, Stability leverages Amazon Web Services (AWS). We provide specific instance recommendations based on the role of the node to optimize for cost-efficiency and performance. These instances have been chosen for their ability to meet and exceed the network's requirements.

| **Type of Service** | **Type of Amazon Web Service Instance** |
|---------------------|---------------------------------------|
| **Validator**           | c6i.4xlarge                           |
| **Archival Node**            | c6i.4xlarge                           |
| **Full Node**           | c6i.2xlarge                           |

It is crucial to select the appropriate AWS instance type based on the specific demands of your node or validator to ensure that your operations run smoothly and without interruptions. This alignment with AWS capabilities also helps in scaling operations as the network grows or during high transaction volumes.
