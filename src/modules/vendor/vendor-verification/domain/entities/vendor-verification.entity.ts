export class VendorVerification {
  
  constructor(
    public id: string,
    public vendorId: string,
    public businessLicense: string,
    public healthPermit: string,
    public insuranceProof: string,
    public status: string,
    public rejectionReason?: string | null,
    public submittedAt?: Date,
    public reviewedAt?: Date | null,
  ) {}
}