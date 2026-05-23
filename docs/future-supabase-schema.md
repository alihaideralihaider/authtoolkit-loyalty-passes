# Future Supabase Schema

No migrations are included in V1. These are proposed future tables.

## loyalty_customers

Repository interface: `CustomerRepository`

- id
- external_customer_id
- email
- phone
- name
- metadata
- created_at
- updated_at

## loyalty_passes

Repository interface: `LoyaltyPassRepository`

- id
- customer_id
- platform
- status
- template_id
- provider_object_id
- metadata
- issued_at
- updated_at
- revoked_at

## loyalty_events

Repository interface: `LoyaltyEventRepository`

- id
- type
- customer_id
- pass_id
- offer_id
- occurred_at
- payload
- created_at

## loyalty_offers

Repository interface: `LoyaltyOfferRepository`

- id
- customer_id
- pass_id
- title
- description
- status
- starts_at
- expires_at
- metadata
- created_at
- updated_at

## loyalty_redemptions

Initial repository owner: future redemption repository or `LoyaltyOfferRepository` extension. V1 keeps redemption state on `LoyaltyOffer`.

- id
- offer_id
- customer_id
- redeemed_at
- metadata
- created_at

## loyalty_provider_objects

Initial repository owner: future provider object repository or `LoyaltyPassRepository` extension. V1 stores `providerObjectId` on `LoyaltyPass`.

- id
- pass_id
- platform
- provider_object_id
- provider_status
- last_provider_result
- created_at
- updated_at
