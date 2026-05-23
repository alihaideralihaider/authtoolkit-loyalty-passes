import type {
  Customer,
  IssuePassInput,
  LoyaltyPass,
  PassPlatform,
  ProviderUpdateResult,
  UpdatePassInput
} from "../types/index.js";
import type { PassProviderAdapter } from "../adapters/pass-provider-adapter.js";
import { ApplePassMockAdapter } from "../adapters/apple-pass-mock-adapter.js";
import { GooglePassMockAdapter } from "../adapters/google-pass-mock-adapter.js";
import { createId, nowIso } from "../core/id.js";

export interface IssuePassResult {
  pass: LoyaltyPass;
  customer: Customer;
  providerResult: ProviderUpdateResult;
}

export interface UpdatePassResult {
  pass: LoyaltyPass;
  providerResult: ProviderUpdateResult;
}

export class LoyaltyPassService {
  private readonly customers = new Map<string, Customer>();
  private readonly passes = new Map<string, LoyaltyPass>();
  private readonly adapters: Record<PassPlatform, PassProviderAdapter>;

  constructor(adapters?: Partial<Record<PassPlatform, PassProviderAdapter>>) {
    this.adapters = {
      apple: adapters?.apple ?? new ApplePassMockAdapter(),
      google: adapters?.google ?? new GooglePassMockAdapter()
    };
  }

  async issuePass(input: IssuePassInput): Promise<IssuePassResult> {
    const timestamp = nowIso();
    const customer: Customer = {
      ...input.customer,
      metadata: input.customer.metadata ?? {},
      createdAt: this.customers.get(input.customer.id)?.createdAt ?? timestamp
    };
    this.customers.set(customer.id, customer);

    const pass: LoyaltyPass = {
      id: createId("pass"),
      customerId: customer.id,
      platform: input.platform,
      templateId: input.templateId,
      status: "issued",
      metadata: input.metadata ?? {},
      issuedAt: timestamp,
      updatedAt: timestamp
    };

    const providerResult = await this.adapters[input.platform].issuePass(pass);
    const issuedPass: LoyaltyPass = {
      ...pass,
      status: "active",
      providerObjectId: providerResult.providerObjectId,
      installUrl: providerResult.installUrl,
      updatedAt: nowIso()
    };
    this.passes.set(issuedPass.id, issuedPass);

    return { pass: issuedPass, customer, providerResult };
  }

  async updatePass(input: UpdatePassInput): Promise<UpdatePassResult> {
    const existing = this.requirePass(input.passId);
    if (existing.status === "revoked") {
      throw new Error(`Cannot update revoked pass: ${input.passId}`);
    }

    const updatedPass: LoyaltyPass = {
      ...existing,
      metadata: {
        ...existing.metadata,
        ...input.updates
      },
      updatedAt: nowIso()
    };

    const providerResult = await this.adapters[updatedPass.platform].updatePass(updatedPass);
    this.passes.set(updatedPass.id, updatedPass);

    return { pass: updatedPass, providerResult };
  }

  async revokePass(passId: string): Promise<UpdatePassResult> {
    const existing = this.requirePass(passId);
    const revokedPass: LoyaltyPass = {
      ...existing,
      status: "revoked",
      revokedAt: nowIso(),
      updatedAt: nowIso()
    };
    const providerResult = await this.adapters[revokedPass.platform].revokePass(revokedPass);
    this.passes.set(revokedPass.id, revokedPass);

    return { pass: revokedPass, providerResult };
  }

  getPass(passId: string): LoyaltyPass | undefined {
    return this.passes.get(passId);
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }

  listPasses(): LoyaltyPass[] {
    return [...this.passes.values()];
  }

  private requirePass(passId: string): LoyaltyPass {
    const pass = this.passes.get(passId);
    if (!pass) {
      throw new Error(`Unknown passId: ${passId}`);
    }
    return pass;
  }
}
