import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { resetIdsForTests } from "../src/core/id.js";
import { LoyaltyEventService } from "../src/events/loyalty-event-service.js";
import { LoyaltyOfferService } from "../src/offers/loyalty-offer-service.js";
import { LoyaltyPassService } from "../src/passes/loyalty-pass-service.js";

describe("AuthToolkit Loyalty Passes foundation", () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  it("issues a pass with a mock provider result", async () => {
    const service = new LoyaltyPassService();

    const result = await service.issuePass({
      customer: {
        id: "cust_123",
        email: "customer@example.com",
        name: "Ada Customer"
      },
      platform: "apple",
      templateId: "coffee_rewards_v1"
    });

    assert.equal(result.pass.id, "pass_000001");
    assert.equal(result.pass.status, "active");
    assert.equal(result.pass.customerId, "cust_123");
    assert.equal(result.providerResult.success, true);
    assert.equal(result.providerResult.platform, "apple");
    assert.equal(result.providerResult.providerObjectId, "apple_mock_pass_000001");
  });

  it("updates a pass through the matching mock provider", async () => {
    const service = new LoyaltyPassService();
    const issued = await service.issuePass({
      customer: { id: "cust_123" },
      platform: "google",
      templateId: "vip_membership_v1"
    });

    const updated = await service.updatePass({
      passId: issued.pass.id,
      updates: {
        points: 120,
        tier: "vip"
      }
    });

    assert.equal(updated.pass.metadata.points, 120);
    assert.equal(updated.pass.metadata.tier, "vip");
    assert.equal(updated.providerResult.platform, "google");
    assert.equal(updated.providerResult.providerObjectId, "google_mock_pass_000001");
  });

  it("starts an offer", () => {
    const service = new LoyaltyOfferService();

    const offer = service.startOffer({
      customerId: "cust_123",
      passId: "pass_123",
      title: "Come back this week",
      description: "Get 15% off your next order."
    });

    assert.equal(offer.id, "offer_000001");
    assert.equal(offer.status, "active");
    assert.equal(offer.customerId, "cust_123");
  });

  it("redeems an active offer", () => {
    const service = new LoyaltyOfferService();
    const offer = service.startOffer({
      customerId: "cust_123",
      title: "VIP reward"
    });

    const redeemed = service.redeemOffer({
      offerId: offer.id,
      metadata: {
        orderId: "order_123"
      }
    });

    assert.equal(redeemed.status, "redeemed");
    assert.equal(redeemed.metadata.orderId, "order_123");
    assert.ok(redeemed.redeemedAt);
  });

  it("records an event", () => {
    const service = new LoyaltyEventService();

    const event = service.recordEvent({
      type: "checkout_completed",
      customerId: "cust_123",
      payload: {
        orderId: "order_123",
        total: 4200
      }
    });

    assert.equal(event.id, "event_000001");
    assert.equal(event.type, "checkout_completed");
    assert.equal(event.customerId, "cust_123");
    assert.equal(event.payload.orderId, "order_123");
  });
});
