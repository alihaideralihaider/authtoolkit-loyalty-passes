import type { PassProviderAdapter } from "./pass-provider-adapter.js";
import type { LoyaltyPass, ProviderUpdateResult } from "../types/index.js";

export class ApplePassMockAdapter implements PassProviderAdapter {
  async issuePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Issued mock Apple pass");
  }

  async updatePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Updated mock Apple pass");
  }

  async revokePass(pass: LoyaltyPass): Promise<ProviderUpdateResult> {
    return this.result(pass, "Revoked mock Apple pass");
  }

  private result(pass: LoyaltyPass, message: string): ProviderUpdateResult {
    return {
      success: true,
      platform: "apple",
      providerObjectId: pass.providerObjectId ?? `apple_mock_${pass.id}`,
      installUrl: `https://passes.local/apple/${pass.id}`,
      message
    };
  }
}
