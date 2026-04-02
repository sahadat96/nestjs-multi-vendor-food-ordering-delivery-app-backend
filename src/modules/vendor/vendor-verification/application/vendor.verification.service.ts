import {
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import type { IVendorVerificationRepository } from '../domain/interface/vendor.verification.interface';
import { VendorVerification } from '../domain/entities/vendor-verification.entity';
import type { IStorageService } from 'src/common/storage/storage.interface';

@Injectable()
export class VendorVerificationService {
  constructor(
    @Inject('IVendorVerificationRepository')
    private readonly repo: IVendorVerificationRepository,

    @Inject('IStorageService')
    private readonly storage: IStorageService,
  ) {}

  async uploadDocuments(
    vendorId: string,
    files: {
      businessLicense?: Express.Multer.File[];
      healthPermit?: Express.Multer.File[];
      insuranceProof?: Express.Multer.File[];
    },
  ): Promise<VendorVerification> {
    
    const existing = await this.repo.findByVendorId(vendorId);

    if (existing && existing.status === 'PENDING') {
      throw new BadRequestException('Already submitted');
    }

    if (
      !files.businessLicense ||
      !files.healthPermit ||
      !files.insuranceProof
    ) {
      throw new BadRequestException('All documents are required');
    }

    const folder = `vendor-verification/${vendorId}`;

    const businessLicenseUrl = await this.storage.uploadFile(
      files.businessLicense[0],
      folder,
    );

    const healthPermitUrl = await this.storage.uploadFile(
      files.healthPermit[0],
      folder,
    );

    const insuranceProofUrl = await this.storage.uploadFile(
      files.insuranceProof[0],
      folder,
    );

    const verification = new VendorVerification(
      randomUUID(),
      vendorId,
      businessLicenseUrl,
      healthPermitUrl,
      insuranceProofUrl,
      'PENDING',
      undefined,
      new Date(),
      undefined,
    );

    return await this.repo.create(verification);
  }
}