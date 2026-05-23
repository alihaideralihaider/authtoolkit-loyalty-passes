# Product Brief

## Product Name

AuthToolkit Loyalty Passes

## Positioning

API-first loyalty pass infrastructure for offers, rewards, memberships, VIP status, and repeat customer engagement.

## Target Customers

- Developers building loyalty and retention systems.
- Agencies delivering customer engagement infrastructure for clients.
- Vertical SaaS platforms that need reusable customer pass primitives.
- Commerce, appointment, service, and hospitality products that want event-driven customer retention.

## Use Cases

- Issue a loyalty pass after checkout or account creation.
- Add a stamp after an order, visit, booking, or purchase.
- Start a time-boxed retention offer after missed or abandoned engagement.
- Redeem an offer and record the redemption event.
- Update VIP, membership, or reward status after business milestones.
- Trigger pass updates from operational events, webhooks, or future agents.

## Example Industries

- Local commerce
- Restaurants and cafes
- Beauty and wellness
- Fitness studios
- Events and ticketing
- Healthcare practices
- Home services
- Agencies managing retention programs for small businesses

## Core Workflows

1. A business event occurs.
2. The event is sent to AuthToolkit Loyalty Passes.
3. A pass, offer, reward, or membership state is created or updated.
4. Mock provider adapters return provider object references.
5. The application stores the result locally for now.
6. Future real adapters can update Apple or Google pass objects.

## Future Agent Integration

Agents should be able to update loyalty passes through explicit APIs after evaluating business events. Examples:

- A recovery agent starts a comeback offer after a missed call is resolved.
- A support agent updates VIP status after a customer milestone.
- A retention agent adds a reward after a repeat purchase.
- An operations agent expires an offer after a campaign window closes.
