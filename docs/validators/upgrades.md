---
sidebar_position: 5
---

# Node Upgrades Guide

Keeping the Stability Blockchain Client up-to-date is essential for maintaining the efficiency and utility of the ecosystem. As such, validators must periodically upgrade their nodes to continue participating in the network effectively.

## Types of Upgrades

There are two primary types of upgrades in the blockchain ecosystem:

- **Runtime Upgrade**: This type of upgrade modifies the consensus rules of the blockchain, impacting the definition of a valid block. An example would be the introduction of a new EVM opcode.

- **Node Upgrade**: This affects how users—whether they are validators or general blockchain users—interact with the blockchain's consensus rules. For instance, adding a new parameter to the blockchain client to allow validators to customize their Prometheus configuration.

## Managing Runtime Upgrades

Stability utilizes the Substrate framework. This allows runtime upgrades on Stability to be seamless, requiring no manual intervention from validators. These upgrades are facilitated through the `pallet_upgrade_runtime`, which is governed by the `pallet_tech_committee`. This committee functions as a multi-signature system, approving runtime upgrades only when a majority of its members consent. Additionally, an EVM interface exists for this purpose, though it adheres to the same consensus requirements.

For more information on Runtime Upgrades, please consult the [Substrate Documentation](https://docs.substrate.io/maintain/runtime-upgrades/).

## Managing Node Upgrades

Node upgrades require active participation from validators to ensure their nodes remain in sync with the network. Each upgrade produces a new Docker image, [you can view the Docker Image here on Github](https://github.com/stabilityprotocol/stability/pkgs/container/stability). This image can be deployed by following [this tutorial](./run_node_using_docker.md).

To stay updated with each node upgrade, validators must download the latest Docker image and restart their nodes, thus ensuring they are running the most current version of the software.
