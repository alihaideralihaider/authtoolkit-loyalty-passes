# AuthToolkit Loyalty Passes

AuthToolkit Loyalty Passes is API-first loyalty pass infrastructure for offers, rewards, memberships, VIP status, and repeat customer engagement.

It exists because loyalty passes are persistent customer presence infrastructure. A pass should not be a static marketing artifact. It should be updated by systems and agents when business events happen: checkout completed, order completed, offer redeemed, missed call recovered, VIP status unlocked, membership changed, or a customer becomes eligible for a retention offer.

## How It Fits AuthToolkit

AuthToolkit provides infrastructure primitives for customer-facing workflows. Loyalty Passes extends that direction into persistent digital passes and engagement loops:

- Issue and update digital passes through APIs.
- Start and redeem offers through APIs.
- Record events from commerce, support, messaging, and recovery systems.
- Keep provider integrations behind adapter boundaries.
- Let future agents update pass state from business events.

## Why "Loyalty Passes" Instead Of "Wallet"

This product deliberately avoids using "wallet" as the primary product name. AuthToolkit may later include payment wallets, stored cards, bank accounts, payment methods, payout infrastructure, or payment vault products. This product is about loyalty cards, digital passes, memberships, rewards, offers, VIP status, and retention workflows.

Use these terms:

- passes
- loyalty passes
- digital passes

Avoid using "wallet" as the product category.

## SaanaOS Later

SaanaOS can become the first vertical customer later. For example, SaanaOS can emit `checkout_completed` or `order_completed` events into the AuthToolkit Loyalty Passes event API. Loyalty Passes can then start an offer, add a stamp, update membership state, or return a deep link back to a SaanaOS order page.

This repo is standalone and not SaanaOS-specific.

## MVP Scope

- TypeScript-first domain model.
- Local-first in-memory services.
- Mock Apple and Google pass adapters.
- API contract docs for issue, update, offers, redemption, and events.
- Pure route/controller functions that can be wired to Express, Fastify, Workers, or another HTTP layer later.
- Basic tests for pass, offer, and event flows.

## Non-Goals For V1

- Real Apple Wallet integration.
- Real Google Wallet integration.
- Supabase or any required database.
- Production deployment.
- Customer-facing UI.
- Payment wallet, stored card, bank account, or payout infrastructure.
- Hardcoded secrets or provider credentials.

## Local Development

Install dependencies:

```bash
npm install
```

Run checks:

```bash
npm run typecheck
npm run test
```

Environment placeholders are documented in `.env.example`. No environment variables are required for local tests.
