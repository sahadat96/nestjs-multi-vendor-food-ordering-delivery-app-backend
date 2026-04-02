import { VendorVerification } from "../../domain/entities/vendor-verification.entity";

export class VendorVerificationMapper {

  static toDomain(raw: any): VendorVerification {
    return new VendorVerification(
      raw.id,
      raw.vendorId,
      raw.businessLicense,
      raw.healthPermit,
      raw.insuranceProof,
      raw.status,
      raw.rejectionReason ?? undefined, 
      raw.submittedAt,
      raw.reviewedAt ?? undefined,
    );
  }
}