# API Contracts

These contracts are drafts. The current code exposes pure controller functions that can be wired to these HTTP endpoints later.

## POST /v1/passes/issue

Request:

```json
{
  "customer": {
    "id": "cust_123",
    "email": "customer@example.com",
    "name": "Ada Customer"
  },
  "platform": "apple",
  "templateId": "coffee_rewards_v1",
  "metadata": {
    "tier": "standard"
  }
}
```

Response:

```json
{
  "ok": true,
  "pass": {
    "id": "pass_abc",
    "customerId": "cust_123",
    "platform": "apple",
    "status": "active"
  },
  "providerResult": {
    "success": true,
    "providerObjectId": "apple_mock_pass_abc"
  }
}
```

## POST /v1/passes/update

Request:

```json
{
  "passId": "pass_abc",
  "updates": {
    "points": 120,
    "tier": "vip"
  }
}
```

Response:

```json
{
  "ok": true,
  "pass": {
    "id": "pass_abc",
    "status": "active",
    "metadata": {
      "points": 120,
      "tier": "vip"
    }
  },
  "providerResult": {
    "success": true,
    "providerObjectId": "apple_mock_pass_abc"
  }
}
```

## POST /v1/offers/start

Request:

```json
{
  "customerId": "cust_123",
  "passId": "pass_abc",
  "title": "Come back this week",
  "description": "Get 15% off your next order.",
  "expiresAt": "2026-06-30T23:59:59.000Z"
}
```

Response:

```json
{
  "ok": true,
  "offer": {
    "id": "offer_abc",
    "customerId": "cust_123",
    "status": "active"
  }
}
```

## POST /v1/offers/redeem

Request:

```json
{
  "offerId": "offer_abc",
  "redeemedAt": "2026-05-23T12:00:00.000Z",
  "metadata": {
    "orderId": "order_123"
  }
}
```

Response:

```json
{
  "ok": true,
  "offer": {
    "id": "offer_abc",
    "status": "redeemed"
  }
}
```

## POST /v1/events

Request:

```json
{
  "type": "checkout_completed",
  "customerId": "cust_123",
  "occurredAt": "2026-05-23T12:00:00.000Z",
  "payload": {
    "orderId": "order_123",
    "total": 4200
  }
}
```

Response:

```json
{
  "ok": true,
  "event": {
    "id": "event_abc",
    "type": "checkout_completed",
    "customerId": "cust_123"
  }
}
```
