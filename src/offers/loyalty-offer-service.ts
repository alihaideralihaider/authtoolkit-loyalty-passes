import type {
  LoyaltyOffer,
  RedeemOfferInput,
  StartOfferInput
} from "../types/index.js";
import { createId, nowIso } from "../core/id.js";

export class LoyaltyOfferService {
  private readonly offers = new Map<string, LoyaltyOffer>();

  startOffer(input: StartOfferInput): LoyaltyOffer {
    const timestamp = nowIso();
    const offer: LoyaltyOffer = {
      id: createId("offer"),
      customerId: input.customerId,
      passId: input.passId,
      title: input.title,
      description: input.description,
      status: "active",
      startsAt: input.startsAt ?? timestamp,
      expiresAt: input.expiresAt,
      metadata: input.metadata ?? {},
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.offers.set(offer.id, offer);
    return offer;
  }

  redeemOffer(input: RedeemOfferInput): LoyaltyOffer {
    const existing = this.requireOffer(input.offerId);
    if (existing.status !== "active") {
      throw new Error(`Offer must be active before redemption: ${input.offerId}`);
    }

    const redeemedOffer: LoyaltyOffer = {
      ...existing,
      status: "redeemed",
      redeemedAt: input.redeemedAt ?? nowIso(),
      metadata: {
        ...existing.metadata,
        ...(input.metadata ?? {})
      },
      updatedAt: nowIso()
    };

    this.offers.set(redeemedOffer.id, redeemedOffer);
    return redeemedOffer;
  }

  getOffer(offerId: string): LoyaltyOffer | undefined {
    return this.offers.get(offerId);
  }

  listOffers(): LoyaltyOffer[] {
    return [...this.offers.values()];
  }

  private requireOffer(offerId: string): LoyaltyOffer {
    const offer = this.offers.get(offerId);
    if (!offer) {
      throw new Error(`Unknown offerId: ${offerId}`);
    }
    return offer;
  }
}
