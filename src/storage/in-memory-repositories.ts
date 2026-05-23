import type { Customer, LoyaltyEvent, LoyaltyOffer, LoyaltyPass } from "../types/index.js";
import type {
  CustomerRepository,
  LoyaltyEventRepository,
  LoyaltyOfferRepository,
  LoyaltyPassRepository
} from "./repositories.js";

export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers = new Map<string, Customer>();

  save(customer: Customer): Customer {
    this.customers.set(customer.id, customer);
    return customer;
  }

  findById(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }

  list(): Customer[] {
    return [...this.customers.values()];
  }
}

export class InMemoryLoyaltyPassRepository implements LoyaltyPassRepository {
  private readonly passes = new Map<string, LoyaltyPass>();

  save(pass: LoyaltyPass): LoyaltyPass {
    this.passes.set(pass.id, pass);
    return pass;
  }

  findById(passId: string): LoyaltyPass | undefined {
    return this.passes.get(passId);
  }

  list(): LoyaltyPass[] {
    return [...this.passes.values()];
  }
}

export class InMemoryLoyaltyOfferRepository implements LoyaltyOfferRepository {
  private readonly offers = new Map<string, LoyaltyOffer>();

  save(offer: LoyaltyOffer): LoyaltyOffer {
    this.offers.set(offer.id, offer);
    return offer;
  }

  findById(offerId: string): LoyaltyOffer | undefined {
    return this.offers.get(offerId);
  }

  list(): LoyaltyOffer[] {
    return [...this.offers.values()];
  }
}

export class InMemoryLoyaltyEventRepository implements LoyaltyEventRepository {
  private readonly events = new Map<string, LoyaltyEvent>();

  save(event: LoyaltyEvent): LoyaltyEvent {
    this.events.set(event.id, event);
    return event;
  }

  findById(eventId: string): LoyaltyEvent | undefined {
    return this.events.get(eventId);
  }

  list(): LoyaltyEvent[] {
    return [...this.events.values()];
  }
}
