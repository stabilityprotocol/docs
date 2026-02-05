---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Audit

## Executive Summary - SlowMist Audit Report Summary - Stability Pallets

On 2023-10-23, the SlowMist security team conducted a "white box" security audit on the Stability pallets. They employed black box testing, grey box testing, and white box testing to ensure a thorough review from multiple perspectives.

## Project Overview

The audit targeted the Stability blockchain implemented in Substrate + Rust, focusing on several specific pallets (modules) within the codebase, as listed in the audit report.

## Findings and Actions Taken

<Tabs>
  <TabItem value="high" label="High Severity Vulnerabilities" default>

| Description | Actions Taken | Status |
|-------------|--------------|--------|
| **Arithmetic Accuracy Deviation Vulnerability**<br/>Potential loss of precision or accuracy due to the use of `saturating_add`, `saturating_mul`, and `saturating_sub` in Rust. | Replaced with checked arithmetic functions (`checked_add`, `checked_mul`, `checked_sub`) to handle overflows gracefully. | Fixed |
| **Integer Overflow Audit**<br/>Risks of integer overflow in numeric variables without proper overflow checks. | Implemented checked arithmetic functions. | Fixed |
| **Error Unhandle Audit (Division by Zero)**<br/>Potential program panic due to division by zero in Rust. | Added checks for division by zero. | Fixed |

  </TabItem>
  <TabItem value="low" label="Low Severity Vulnerabilities">

| Description | Actions Taken | Status |
|-------------|--------------|--------|
| **Weights Audit (Unreasonable Pallet Weight)**<br/>Operations having their weight set to 0, potentially leading to unreasonable resource allocation. | Reviewed and adjusted weights based on computational requirements. | Fixed |
| **Arithmetic Accuracy Deviation Vulnerability (Balance Precision Loss)**<br/>Loss of balance precision when converting `U256` to `u128`. | Acknowledged as a known limitation; implemented fallback checks. | Acknowledged |

  </TabItem>
</Tabs>

### Suggested Improvements

| Description | Actions Taken | Status |
|-------------|--------------|--------|
| **Unimplemented Function Logic**<br/>Certain functions are lacking full implementation. | Acknowledged and reviewed; these functions were mocked as they are not utilized in the current logic. | Acknowledged |
| **Node Crash Risk (Use of `panic!()`)**<br/>Potential node crash due to the use of `panic!()` in certain functions. | Replaced `panic!()` with appropriate error handling. | Fixed |
| **Avoid Hardcoding Values**<br/>Hardcoded Ethereum addresses in the code. | Refactored to use configuration files, environment variables, and parameterization for more flexibility. | Fixed |

## Conclusion

The audit identified 4 high-risk, 4 low-risk, and 3 suggested vulnerability categories. The team has addressed most of the vulnerabilities, with some acknowledged due to their nature or current architecture limitations.

[Find the full report here](../../static/Slowmist-Audit.pdf).
