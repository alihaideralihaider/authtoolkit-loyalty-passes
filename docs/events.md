# Events

Events describe business activity that can create, update, expire, or redeem loyalty passes and offers.

## checkout_completed

```json
{
  "type": "checkout_completed",
  "customerId": "cust_123",
  "payload": {
    "checkoutId": "checkout_123",
    "total": 4200
  }
}
```

## order_completed

```json
{
  "type": "order_completed",
  "customerId": "cust_123",
  "payload": {
    "orderId": "order_123",
    "items": 3
  }
}
```

## missed_call_recovered

```json
{
  "type": "missed_call_recovered",
  "customerId": "cust_123",
  "payload": {
    "callId": "call_123",
    "recoveryChannel": "sms"
  }
}
```

## offer_started

```json
{
  "type": "offer_started",
  "customerId": "cust_123",
  "payload": {
    "offerId": "offer_123"
  }
}
```

## offer_expiring

```json
{
  "type": "offer_expiring",
  "customerId": "cust_123",
  "payload": {
    "offerId": "offer_123",
    "expiresAt": "2026-06-30T23:59:59.000Z"
  }
}
```

## offer_redeemed

```json
{
  "type": "offer_redeemed",
  "customerId": "cust_123",
  "payload": {
    "offerId": "offer_123",
    "orderId": "order_123"
  }
}
```

## pass_installed

```json
{
  "type": "pass_installed",
  "customerId": "cust_123",
  "payload": {
    "passId": "pass_123",
    "platform": "apple"
  }
}
```

## pass_updated

```json
{
  "type": "pass_updated",
  "customerId": "cust_123",
  "payload": {
    "passId": "pass_123",
    "fields": ["points", "tier"]
  }
}
```

## vip_unlocked

```json
{
  "type": "vip_unlocked",
  "customerId": "cust_123",
  "payload": {
    "tier": "vip"
  }
}
```

## customer_reactivated

```json
{
  "type": "customer_reactivated",
  "customerId": "cust_123",
  "payload": {
    "source": "retention_offer"
  }
}
```

## stamp_added

```json
{
  "type": "stamp_added",
  "customerId": "cust_123",
  "payload": {
    "passId": "pass_123",
    "stampCount": 5
  }
}
```

## membership_updated

```json
{
  "type": "membership_updated",
  "customerId": "cust_123",
  "payload": {
    "membershipId": "membership_123",
    "status": "active"
  }
}
```
