# USB Stablecoin

## Peg Mechanism

USB maintains a 1:1 USD peg through a **delta-neutral strategy**:

- **Collateral:** USDC and USDT deposited by users
- **Yield generation:** Collateral is supplied to Aave v3 on Arbitrum One, earning lending rates
- **Rebalancing:** The USBVault automatically manages deposits, withdrawals, and yield harvesting
- **Peg stability:** USB is always redeemable 1:1 for USDC or USDT through the vault

## sUSB — Yield-Bearing Token

sUSB is an ERC-4626 tokenized vault that represents a yielding position in USB.

- **90% of Aave yield** accrues to sUSB holders via exchange rate growth
- **10% goes to the Treasury** for protocol sustainability
- **No lockups** — wrap/unwrap at any time (testnet: 24h cooldown)
- **Auto-compounding** — yield is harvested and distributed automatically

## Security

- ✅ Smart contracts audited by independent firms
- ✅ All contracts verified on Arbiscan
- ✅ Role-based access control (pausable, role-based mint/pause)
- ✅ Testnet deployment on Arbitrum Sepolia with 100,000 USB cap

## Contract Addresses (Arbitrum Sepolia)

| Contract | Address |
|---|---|
| USB | `0x424842902428750387189a0a648921fdDb0573d7` |
| USBVault | `0x43F0423915230667482B41a437cfdd08F63ddd95` |
| sUSB | `0xc0aeB1266a5889D3e242610a27e217652D01e98b` |
| Treasury | `0x598d5Ecdbc4d965ACb9f64733bc21F1053C24737` |
| AaveV3Strategy | `0x7be89fd4E71479E1f2efef5673C65baB7bF86F88` |
