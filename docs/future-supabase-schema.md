# Future Supabase Schema

No migrations are included in V1. These are proposed future tables.

## loyalty_customers

- id
- external_customer_id
- email
- phone
- name
- metadata
- created_at
- updated_at

## loyalty_passes

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

- id
- type
- customer_id
- pass_id
- offer_id
- occurred_at
- payload
- created_at

## loyalty_offers

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

- id
- offer_id
- customer_id
- redeemed_at
- metadata
- created_at

## loyalty_provider_objects

- id
- pass_id
- platform
- provider_object_id
- provider_status
- last_provider_result
- created_at
- updated_at
