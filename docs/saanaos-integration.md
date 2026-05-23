# Future SaanaOS Integration

SaanaOS can consume AuthToolkit Loyalty Passes through the event API without this product becoming SaanaOS-specific.

## Example Flow

```text
SaanaOS checkout_completed
-> AuthToolkit Loyalty Passes event API
-> loyalty offer or pass update
-> deep link back to SaanaOS order page
```

## Example Event

```json
{
  "type": "checkout_completed",
  "customerId": "saana_customer_123",
  "payload": {
    "checkoutId": "checkout_123",
    "orderUrl": "https://saanaos.example/orders/order_123",
    "total": 4200
  }
}
```

## Possible Outcomes

- Add a stamp to the customer's loyalty pass.
- Start a comeback offer.
- Update VIP status.
- Add a deep link to the SaanaOS order page.
- Record `customer_reactivated` after the customer returns.
