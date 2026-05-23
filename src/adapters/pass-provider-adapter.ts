import type { LoyaltyPass, ProviderUpdateResult } from "../types/index.js";

export interface PassProviderAdapter {
  issuePass(pass: LoyaltyPass): Promise<ProviderUpdateResult>;
  updatePass(pass: LoyaltyPass): Promise<ProviderUpdateResult>;
  revokePass(pass: LoyaltyPass): Promise<ProviderUpdateResult>;
}
