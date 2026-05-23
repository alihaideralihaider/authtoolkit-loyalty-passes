import type { Customer, LoyaltyEvent, LoyaltyOffer, LoyaltyPass } from "../types/index.js";

export interface CustomerRepository {
  save(customer: Customer): Customer;
  findById(customerId: string): Customer | undefined;
  list(): Customer[];
}

export interface LoyaltyPassRepository {
  save(pass: LoyaltyPass): LoyaltyPass;
  findById(passId: string): LoyaltyPass | undefined;
  list(): LoyaltyPass[];
}

export interface LoyaltyOfferRepository {
  save(offer: LoyaltyOffer): LoyaltyOffer;
  findById(offerId: string): LoyaltyOffer | undefined;
  list(): LoyaltyOffer[];
}

export interface LoyaltyEventRepository {
  save(event: LoyaltyEvent): LoyaltyEvent;
  findById(eventId: string): LoyaltyEvent | undefined;
  list(): LoyaltyEvent[];
}
