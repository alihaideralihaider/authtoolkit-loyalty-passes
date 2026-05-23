import type { PassProviderAdapter } from "./pass-provider-adapter.js";
import type { LoyaltyPass, ProviderUpdateResult } from "../types/index.js";

export class GooglePassMockAdapter implements PassProviderAdapter {
  async issuePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Issued mock Google pass");
  }

  async updatePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Updated mock Google pass");
  }

  async revokePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Revoked mock Google pass");
  }

  private result(pass: LoyaltyPass, message: string): ProviderUpdateResult {
    return {
      success: true,
      platform: "google",
      providerObjectId: pass.providerObjectId ?? `google_mock_${pass.id}`,
      installUrl: `https://passes.local/google/${pass.id}`,
      message
    };
  }
}
