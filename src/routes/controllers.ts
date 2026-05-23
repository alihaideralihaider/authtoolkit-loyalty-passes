import type {
  IssuePassInput,
  RecordEventInput,
  RedeemOfferInput,
  StartOfferInput,
  UpdatePassInput
} from "../types/index.js";
import { LoyaltyEventService } from "../events/loyalty-event-service.js";
import { LoyaltyOfferService } from "../offers/loyalty-offer-service.js";
import { LoyaltyPassService } from "../passes/loyalty-pass-service.js";

export interface LoyaltyControllers {
  issuePass(input: IssuePassInput): Promise<unknown>;
  updatePass(input: UpdatePassInput): Promise<unknown>;
  startOffer(input: StartOfferInput): Promise<unknown>;
  redeemOffer(input: RedeemOfferInput): Promise<unknown>;
  recordEvent(input: RecordEventInput): Promise<unknown>;
}

export interface LoyaltyControllerServices {
  passService: LoyaltyPassService;
  offerService: LoyaltyOfferService;
  eventService: LoyaltyEventService;
}

export function createLoyaltyControllers(services?: Partial<LoyaltyControllerServices>): LoyaltyControllers {
  const passService = services?.passService ?? new LoyaltyPassService();
  const offerService = services?.offerService ?? new LoyaltyOfferService();
  const eventService = services?.eventService ?? new LoyaltyEventService();

  return {
    async issuePass(input) {
      const result = await passService.issuePass(input);
      return { ok: true, ...result };
    },

    async updatePass(input) {
      const result = await passService.updatePass(input);
      return { ok: true, ...result };
    },

    async startOffer(input) {
      const offer = offerService.startOffer(input);
      eventService.recordEvent({
        type: "offer_started",
        customerId: offer.customerId,
        passId: offer.passId,
        offerId: offer.id,
        payload: { title: offer.title }
      });
      return { ok: true, offer };
    },

    async redeemOffer(input) {
      const offer = offerService.redeemOffer(input);
      eventService.recordEvent({
        type: "offer_redeemed",
        customerId: offer.customerId,
        passId: offer.passId,
        offerId: offer.id,
        occurredAt: offer.redeemedAt,
        payload: input.metadata ?? {}
      });
      return { ok: true, offer };
    },

    async recordEvent(input) {
      const event = eventService.recordEvent(input);
      return { ok: true, event };
    }
  };
}
