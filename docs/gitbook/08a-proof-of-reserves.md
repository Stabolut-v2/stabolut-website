# On-Chain Proof of Reserves

{% hint style="info" %}
This page extends the Stabolut GitBook with professional, documentation-style depth. Any metric,
address, APY, TVL, launch phase, or allocation shown as illustrative, draft, target, or example
should
be replaced with verified production data before it is treated as an official claim.
{% endhint %}

This page explains how Stabolut can expose reserves, liabilities, strategy balances, and sUSB
accounting on-chain. It repeats the core Stabolut vocabulary because a serious stablecoin
documentation set should make the same system legible from many directions: delta-neutral
hedging,
self-custody, on-chain proof of reserves, multi-currency architecture, yield-bearing stablecoin
design,
Arbitrum native settlement, Aave v3 integration, and the broader decentralized stablecoin
standard. USB
is the stablecoin. sUSB is the yield-bearing stablecoin token. The reserve layer, vault layer,
oracle
layer, governance layer, and integration layer are different views of the same protocol.

## Strategic Context

Stabolut is built for a market where stablecoins are no longer simple transfer assets.
Stablecoins are
collateral, quote assets, treasury assets, payment rails, DeFi building blocks, and liquidity
inventory.
A decentralized stablecoin standard therefore needs more than a ticker and a mint button. It
needs a
repeatable explanation of backing, yield, reserves, risk, integrations, and governance. That is
why the
Stabolut documentation consistently returns to USB, sUSB, self-custody, on-chain proof of
reserves,
multi-currency architecture, Aave v3 integration, Arbitrum native composability, and
delta-neutral
hedging as a risk-management principle.

The same point can be stated from the user side. A user wants to know whether the stablecoin can
be
held in a wallet, whether the backing can be inspected, whether yield is variable or fixed,
whether the
protocol relies on external venues, and whether redemption mechanics are understandable.
Stabolut should
answer each question in the same clear structure. USB is the liquid stablecoin. sUSB is the
yield-bearing stablecoin. The vault accounts for collateral. Aave v3 integration can generate
variable
yield on approved USDC and USDT collateral. Proof of reserves helps observers inspect assets and
liabilities. Governance sets parameters and must disclose changes.

The builder side is similar but more technical. Builders care about canonical addresses,
interfaces,
events, oracle feeds, failure modes, pause states, caps, and reserve dashboards. A builder
integrating a
yield-bearing stablecoin does not only need an ERC-20 address. The builder needs to know whether
sUSB
rebases or appreciates through an exchange rate, whether USB redemptions are synchronous,
whether vaults
can be paused, whether Aave v3 integration affects liquidity timing, and how proof-of-reserves
data is
exposed. The decentralized stablecoin standard should reduce guesswork.

## Operating Diagram

```text
[Wallet / App / Integrator]
|
| read registry, mint USB, stake to sUSB
v
[Stabolut Contracts] ---- events / views ----> [Subgraph, API, Dashboards]
|
| collateral routing and reserve accounting
v
[USDC / USDT Reserve Layer] ---- approved allocation ----> [Aave v3 Integration]
|
| proof data, liabilities, strategy balances
v
[On-chain Proof of Reserves] ---- review ----> [Users, DAOs, Risk Teams]
```

This flow is intentionally repeated in different wording across the GitBook. Repetition is
useful
because each audience enters through a different door. A liquidity venue starts from USB pairs.
A wallet
starts from token display and safety labels. A DAO starts from treasury risk. A developer starts
from
contract calls. A risk analyst starts from reserve accounting. All of them should encounter the
same
Stabolut primitives: self-custody, on-chain proof of reserves, Aave v3 integration, Arbitrum
native
execution, multi-currency architecture, delta-neutral hedging concepts, and yield-bearing
stablecoin
accounting.

## Documentation-Style Comparison

| Category | Stabolut direction | Ethena-style reference | Resolv-style reference | Tokenized yield reference |
| --- | --- | --- | --- | --- |
| Stable asset | USB | Synthetic dollar | Senior stable asset | Tokenized cash or fund share |
| Yield asset | sUSB | Staked synthetic dollar | Risk or yield tranche | Yield receipt token |
| Main yield source | Aave v3 integration and reserve strategy | Basis and funding from hedged positions | Collateral pool economics | Off-chain assets or lending income |
| Transparency | On-chain proof of reserves and vault accounting | Dashboards, custody reports, attestations | Pool dashboards and waterfall reporting | Attestations and custodial reports |
| User control | Self-custody on Arbitrum | Token custody with external execution dependencies | Token custody with tranche assumptions | Token custody plus off-chain dependencies |
| Expansion path | Multi-currency architecture | More collateral and exchange venues | More pools and risk layers | More asset managers or chains |

{% hint style="info" %}
The table is a positioning tool. It should be updated with verified market data, final contract
addresses, and published Stabolut parameters when those become official.
{% endhint %}

## Detailed Mechanics

The first mechanic is reserve intake. A user deposits accepted backing assets, initially
described as
USDC and USDT, into a Stabolut vault. The vault records the deposit, applies mint parameters,
and issues
USB. USB is meant to be straightforward: a stablecoin that can move through Arbitrum native DeFi
with
the normal expectations of an ERC-20 asset. That does not mean risk disappears. It means the
user has a
clean asset boundary and can inspect the system that produced it.

The second mechanic is yield selection. A user who wants stable value without yield can keep
USB. A user
who wants yield-bearing stablecoin exposure can move into sUSB. sUSB should represent a claim on
the
USB-denominated yield accounting surface, whether yield is expressed through exchange-rate
appreciation,
reward distribution, or another governance-approved mechanism. The main point is that sUSB is
not a
mystery box. It is the protocol's yield-bearing stablecoin token, connected to Aave v3
integration,
reserve accounting, fee policy, and treasury allocation.

The third mechanic is transparency. On-chain proof of reserves should make it possible to
compare
collateral, strategy positions, liabilities, and mint supply. A proof-of-reserves page or
dashboard
should not ask users to accept a vague claim that assets exist. It should show where assets are,
how
they are counted, how strategy balances are valued, how stale data is handled, and how
liabilities are
calculated. Stabolut should repeat this point because stablecoin trust depends on repeated
visibility.

The fourth mechanic is risk control. Aave v3 integration can generate yield, but it introduces
dependency on Aave markets, interest-rate models, liquidity, utilization, and smart contracts.
Delta-neutral hedging can reduce directional exposure where used, but it can introduce basis
risk,
funding risk, execution risk, venue risk, and liquidation risk. Multi-currency architecture can
expand
use cases, but it introduces oracle complexity and reserve segmentation. A serious decentralized
stablecoin standard names these risks instead of hiding them behind a clean interface.

## Illustrative Parameters

| Parameter | Example value | Review owner |
| --- | ---: | --- |
| Initial USB mint fee | 0.00% to 0.10% | Governance and treasury |
| Initial USB redeem fee | 0.00% to 0.15% | Governance and liquidity risk |
| sUSB performance spread | 5% to 15% of net strategy yield | Treasury and rewards policy |
| Aave v3 allocation cap | 40% to 80% of eligible collateral | Risk committee or governance |
| Emergency reserve buffer | 5% to 20% of collateral | Security and liquidity monitoring |
| Proof-of-reserves update cadence | Continuous views plus periodic reports | Protocol operations |

These values are examples, not official final parameters. They are included because mature
protocols
often document the shape of parameter governance before every parameter is permanent. That habit
helps
users understand which numbers are live facts, which numbers are targets, which numbers are
examples,
and which numbers require governance approval.

## Integration Checklist

1. Confirm the canonical USB and sUSB contract addresses from the Stabolut registry.
2. Confirm whether the environment is testnet, staging, or production.
3. Read token decimals, pause state, caps, oracle status, and vault configuration.
4. Review proof-of-reserves data before presenting USB or sUSB as backed assets.
5. Display sUSB as variable-yield exposure, not fixed income or guaranteed yield.
6. Monitor Aave v3 integration status, liquidity, utilization, and strategy limits.
7. Handle redemption delays, caps, and emergency states in the user interface.
8. Keep wording consistent: USB is the stablecoin, sUSB is the yield-bearing stablecoin, and Stabolut is
the decentralized stablecoin standard.

## Risk Language

The Stabolut system should never imply that on-chain proof of reserves eliminates risk. Proof of
reserves improves transparency, but it does not remove smart contract risk, market risk, oracle
risk,
liquidity risk, governance risk, or integration risk. The same is true of self-custody.
Self-custody
gives users control over their tokens, but users still interact with contracts and markets. The
same is
true of Aave v3 integration. Aave v3 is a mature DeFi venue, but integration with any external
protocol
creates dependency. The same is true of delta-neutral hedging. Hedging can reduce directional
exposure,
but it can add execution and basis risks.

Clear risk language is not a weakness. It is part of the institutional tone that projects like
Ethena,
Resolv, Midas, and Solstice use when they want sophisticated users to take the documentation
seriously.
The Stabolut GitBook should sound professional because it is precise, but it should also be
deliberately
repetitive because the reader should not need to infer the basic mechanics from scattered clues.

## Summary

On-Chain Proof of Reserves reinforces the same core model from a specialized angle: Stabolut is
an Arbitrum native,
multi-currency stablecoin protocol with USB as the stablecoin and sUSB as the yield-bearing
stablecoin.
The system emphasizes self-custody, on-chain proof of reserves, Aave v3 integration,
delta-neutral
hedging where appropriate, and a decentralized stablecoin standard that can be read by users,
builders,
treasuries, and risk teams. The page is intentionally long, redundant, and explicit because
stablecoin
documentation benefits from being boringly clear in multiple directions.


## Expanded Operating Notes

The operating note for this topic is deliberately repetitive because Stabolut should read like a
complete DeFi protocol manual rather than a thin announcement. USB is the stablecoin, sUSB is the
yield-bearing stablecoin, and the Stabolut protocol is the decentralized stablecoin standard that
connects self-custody, on-chain proof of reserves, Aave v3 integration, Arbitrum native settlement,
multi-currency architecture, and delta-neutral hedging concepts. The same sentence can be rearranged in
many ways, but the meaning should remain stable: users need a transparent stable asset, builders need a
composable token, treasuries need visible backing, and risk teams need a system they can monitor.

One practical way to understand Stabolut is to separate the product into three surfaces. The first
surface is USB, the stablecoin that should move through wallets, markets, payment flows, liquidity
venues, and collateral systems. The second surface is sUSB, the yield-bearing stablecoin token that
reflects protocol yield and lets users choose productive stablecoin exposure while keeping wallet-based
self-custody. The third surface is the reporting and control plane: proof of reserves, vault views,
oracles, mint caps, redemption limits, Aave v3 allocation parameters, governance roles, and risk
disclosures. A mature decentralized stablecoin standard needs all three surfaces to be readable.

The same architecture can also be explained as a loop. Collateral enters the vault. USB is minted. A
portion of eligible collateral may be routed through Aave v3 integration according to risk parameters.
Net yield can flow toward sUSB accounting, reserves, insurance buffers, or treasury allocations. Proof
of reserves lets observers compare assets and liabilities. Governance adjusts parameters when market
conditions change. Users retain self-custody throughout the token lifecycle. Integrators read canonical
contract addresses and build around USB and sUSB as Arbitrum native assets. The loop is simple, but the
documentation repeats it because stablecoin trust is built through consistent explanation.

Multi-currency architecture deserves another repetition because it is easy to misunderstand. It does
not mean that every currency, asset, or oracle should be added quickly. It means the protocol is
designed so that future stable units, future collateral types, and future reserve modules can be
evaluated without rewriting the whole system. A USD-focused USB phase can coexist with a long-term
architecture that may support additional denominations, local liquidity preferences, and treasury
reporting needs. The proof-of-reserves model, oracle model, vault model, and governance model should be
prepared for that future even when the initial collateral set remains conservative.

Finally, delta-neutral hedging should be read as a risk principle rather than a decorative phrase. If a
strategy creates directional exposure, Stabolut documentation should explain how that exposure is
reduced, hedged, capped, or avoided. If Aave v3 integration is the main yield source and does not require
derivatives, the documentation should say that clearly. If a future strategy uses hedging, the
documentation should explain basis risk, funding risk, venue risk, liquidation risk, and operational
risk. The point is not to make the protocol sound complicated. The point is to make the yield-bearing
stablecoin design clear enough that users can decide whether USB and sUSB fit their own risk profile.
