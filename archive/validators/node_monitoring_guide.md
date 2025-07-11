---
sidebar_position: 6
---

# Node Monitoring Guide

This document provides a clear and straightforward guide on setting up monitoring your node on the Stability Network. Monitoring your node is crucial for gaining insights into various metrics such as peer connections, block finalization, transaction peaks, and more.


## Overview

Stability utilizes Substrate pallets, and as such, is able to offer comprehensive metrics that can be visualized using tools like Grafana, thanks to compatibility with Prometheus endpoints. This guide will help you configure a local environment to monitor these metrics effectively.

For more detailed information, refer to the official [Substrate documentation](https://docs.substrate.io/tutorials/build-a-blockchain/monitor-node-metrics/).

## Quick Start

### Setting Up Monitoring Tools

To monitor your local client, we provide a `docker-compose` file that simplifies the setup of Prometheus and Grafana:

- **Prometheus**: An open-source tool designed for monitoring and alerting in cloud-native ecosystems. It collects and stores metrics, providing an API for integration with other applications like dashboards.
- **Grafana**: Facilitates the visualization of monitoring data, offering features to create charts and tables that enhance data analysis.

A pre-configured dashboard tailored for metrics is also provided to jumpstart your monitoring setup.

### Steps to Monitor Your Node

1. **Start the Monitoring Services**:
   
   Use the provided `docker-compose` file to launch Prometheus and Grafana services:

   ```bash
   docker-compose -f docker/monitoring/docker-compose.yml up
   ```

2. **Launch the Substrate Client**:

   After the services are up, start your Substrate client with the `--prometheus-external` flag to enable metric collection:

   ```bash
   substrate --prometheus-external
   ```

   Metrics are available at: `http://localhost:9165/metrics`

3. **Access Grafana Dashboard**:

   With the setup complete, access Grafana to view your node's metrics:

   - Visit: `http://localhost:3000`
   - Use `admin` for both username and password.

   To find the pre-configured dashboard, navigate through the left menu: `Dashboards > General`.

You are now ready to monitor your development chain, with real-time insights into its performance and operations. 

The system as described here should not be opened to the public internet. Neither Prometheus nor Grafana as shown here is hardened against unauthorized access. Make sure that both of them are accessible only over a secured proxy, local network, or VPN.
