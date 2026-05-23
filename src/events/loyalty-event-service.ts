import type { LoyaltyEvent, RecordEventInput } from "../types/index.js";
import { createId, nowIso } from "../core/id.js";

export class LoyaltyEventService {
  private readonly events = new Map<string, LoyaltyEvent>();

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

    this.events.set(event.id, event);
    return event;
  }

  getEvent(eventId: string): LoyaltyEvent | undefined {
    return this.events.get(eventId);
  }

  listEvents(): LoyaltyEvent[] {
    return [...this.events.values()];
  }
}
