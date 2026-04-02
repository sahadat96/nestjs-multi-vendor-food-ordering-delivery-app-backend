import { VendorVerification } from "../entities/vendor-verification.entity";

export interface IVendorVerificationRepository {

  create(data: VendorVerification): Promise<VendorVerification>;

  findByVendorId(vendorId: string): Promise<VendorVerification | null>;

  createOrUpdate(
    vendorId: string,
    status: string,
    reason?: string,
  ): Promise<void>;
}   