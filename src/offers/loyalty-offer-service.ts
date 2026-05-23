import type {
  LoyaltyOffer,
  RedeemOfferInput,
  StartOfferInput
} from "../types/index.js";
import { createId, nowIso } from "../core/id.js";
import {
  InMemoryLoyaltyOfferRepository,
  type LoyaltyOfferRepository
} from "../storage/index.js";

export class LoyaltyOfferService {
  private readonly offerRepository: LoyaltyOfferRepository;

  constructor(offerRepository: LoyaltyOfferRepository = new InMemoryLoyaltyOfferRepository()) {
    this.offerRepository = offerRepository;
  }

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

    this.offerRepository.save(offer);
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

    this.offerRepository.save(redeemedOffer);
    return redeemedOffer;
  }

  getOffer(offerId: string): LoyaltyOffer | undefined {
    return this.offerRepository.findById(offerId);
  }

  listOffers(): LoyaltyOffer[] {
    return this.offerRepository.list();
  }

  private requireOffer(offerId: string): LoyaltyOffer {
    const offer = this.offerRepository.findById(offerId);
    if (!offer) {
      throw new Error(`Unknown offerId: ${offerId}`);
    }
    return offer;
  }
}
