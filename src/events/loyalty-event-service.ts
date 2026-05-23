import type { LoyaltyEvent, RecordEventInput } from "../types/index.js";
import { createId, nowIso } from "../core/id.js";
import {
  InMemoryLoyaltyEventRepository,
  type LoyaltyEventRepository
} from "../storage/index.js";

export class LoyaltyEventService {
  private readonly eventRepository: LoyaltyEventRepository;

  constructor(eventRepository: LoyaltyEventRepository = new InMemoryLoyaltyEventRepository()) {
    this.eventRepository = eventRepository;
  }

  recordEvent(input: RecordEventInput): LoyaltyEvent {
    const timestamp = nowIso();
    const event: LoyaltyEvent = {
      id: createId("event"),
      type: input.type,
      customerId: input.customerId,
      passId: input.passId,
      offerId: input.offerId,
      occurredAt: input.occurredAt ?? timestamp,
      payload: input.payload ?? {},
      createdAt: timestamp
    };

    this.eventRepository.save(event);
    return event;
  }

  getEvent(eventId: string): LoyaltyEvent | undefined {
    return this.eventRepository.findById(eventId);
  }

  listEvents(): LoyaltyEvent[] {
    return this.eventRepository.list();
  }
}
