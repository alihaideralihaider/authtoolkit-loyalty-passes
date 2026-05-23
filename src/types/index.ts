export type PassPlatform = "apple" | "google";

export type LoyaltyPassStatus = "issued" | "active" | "suspended" | "revoked";

export type OfferStatus = "draft" | "active" | "redeemed" | "expired" | "cancelled";

export type LoyaltyEventType =
  | "checkout_completed"
  | "order_completed"
  | "missed_call_recovered"
  | "offer_started"
  | "offer_expiring"
  | "offer_redeemed"
  | "pass_installed"
  | "pass_updated"
  | "vip_unlocked"
  | "customer_reactivated"
  | "stamp_added"
  | "membership_updated"
  | string;

export interface Customer {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface LoyaltyPass {
  id: string;
  customerId: string;
  platform: PassPlatform;
  templateId: string;
  status: LoyaltyPassStatus;
  providerObjectId?: string;
  installUrl?: string;
  metadata: Record<string, unknown>;
  issuedAt: string;
  updatedAt: string;
  revokedAt?: string;
}

export interface LoyaltyOffer {
  id: string;
  customerId: string;
  passId?: string;
  title: string;
  description?: string;
  status: OfferStatus;
  startsAt: string;
  expiresAt?: string;
  redeemedAt?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface LoyaltyEvent {
  id: string;
  type: LoyaltyEventType;
  customerId?: string;
  passId?: string;
  offerId?: string;
  occurredAt: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface ProviderUpdateResult {
  success: boolean;
  platform: PassPlatform;
  providerObjectId: string;
  message: string;
  installUrl?: string;
  raw?: Record<string, unknown>;
}

export interface IssuePassInput {
  customer: Omit<Customer, "createdAt">;
  platform: PassPlatform;
  templateId: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePassInput {
  passId: string;
  updates: Record<string, unknown>;
}

export interface StartOfferInput {
  customerId: string;
  passId?: string;
  title: string;
  description?: string;
  startsAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RedeemOfferInput {
  offerId: string;
  redeemedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface RecordEventInput {
  type: LoyaltyEventType;
  customerId?: string;
  passId?: string;
  offerId?: string;
  occurredAt?: string;
  payload?: Record<string, unknown>;
}
