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
import {
  InMemoryCustomerRepository,
  InMemoryLoyaltyPassRepository,
  type CustomerRepository,
  type LoyaltyPassRepository
} from "../storage/index.js";

export interface IssuePassResult {
  pass: LoyaltyPass;
  customer: Customer;
  providerResult: ProviderUpdateResult;
}

export interface UpdatePassResult {
  pass: LoyaltyPass;
  providerResult: ProviderUpdateResult;
}

export interface LoyaltyPassServiceDependencies {
  adapters?: Partial<Record<PassPlatform, PassProviderAdapter>>;
  customerRepository?: CustomerRepository;
  passRepository?: LoyaltyPassRepository;
}

export class LoyaltyPassService {
  private readonly customerRepository: CustomerRepository;
  private readonly passRepository: LoyaltyPassRepository;
  private readonly adapters: Record<PassPlatform, PassProviderAdapter>;

  constructor(dependencies: LoyaltyPassServiceDependencies = {}) {
    this.customerRepository = dependencies.customerRepository ?? new InMemoryCustomerRepository();
    this.passRepository = dependencies.passRepository ?? new InMemoryLoyaltyPassRepository();
    this.adapters = {
      apple: dependencies.adapters?.apple ?? new ApplePassMockAdapter(),
      google: dependencies.adapters?.google ?? new GooglePassMockAdapter()
    };
  }

  async issuePass(input: IssuePassInput): Promise<IssuePassResult> {
    const timestamp = nowIso();
    const customer: Customer = {
      ...input.customer,
      metadata: input.customer.metadata ?? {},
      createdAt: this.customerRepository.findById(input.customer.id)?.createdAt ?? timestamp
    };
    this.customerRepository.save(customer);

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
    this.passRepository.save(issuedPass);

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
    this.passRepository.save(updatedPass);

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
    this.passRepository.save(revokedPass);

    return { pass: revokedPass, providerResult };
  }

  getPass(passId: string): LoyaltyPass | undefined {
    return this.passRepository.findById(passId);
  }

  getCustomer(customerId: string): Customer | undefined {
    return this.customerRepository.findById(customerId);
  }

  listPasses(): LoyaltyPass[] {
    return this.passRepository.list();
  }

  private requirePass(passId: string): LoyaltyPass {
    const pass = this.passRepository.findById(passId);
    if (!pass) {
      throw new Error(`Unknown passId: ${passId}`);
    }
    return pass;
  }
}
