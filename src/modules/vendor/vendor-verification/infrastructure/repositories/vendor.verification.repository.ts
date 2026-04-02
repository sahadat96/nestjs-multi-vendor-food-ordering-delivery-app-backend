import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { IVendorVerificationRepository } from '../../domain/interface/vendor.verification.interface';
import { VendorVerification } from '../../domain/entities/vendor-verification.entity';
import { VendorVerificationMapper } from '../mapper/vendor.verification.mapper';
import { VerificationStatus, Prisma } from '@prisma/client';

type VendorVerificationRecord = Prisma.VendorVerificationGetPayload<{}>;

@Injectable()
export class VendorVerificationRepository
  implements IVendorVerificationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByVendorId(
    vendorId: string,
  ): Promise<VendorVerification | null> {
    const record: VendorVerificationRecord | null =
      await this.prisma.vendorVerification.findUnique({
        where: { vendorId },
      });

    if (!record) return null;

    return VendorVerificationMapper.toDomain(record);
  }

  async create(
      data: VendorVerification,
    ): Promise<VendorVerification> {
      const created = await this.prisma.vendorVerification.create({
        data: {
          id: data.id,
          vendorId: data.vendorId,
          businessLicense: data.businessLicense,
          healthPermit: data.healthPermit,
          insuranceProof: data.insuranceProof,

          status: VerificationStatus.PENDING,

          rejectionReason: data.rejectionReason ?? null,
          submittedAt: data.submittedAt ?? new Date(),
        },
      });

    return VendorVerificationMapper.toDomain(created);
  }

  async createOrUpdate(
    vendorId: string,
    status: VerificationStatus,
    reason?: string,
  ): Promise<void> {
    
    const existing = await this.prisma.vendorVerification.findUnique({
      where: { vendorId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException('Verification record not found');
    }

    await this.prisma.vendorVerification.update({
      where: { vendorId },
      data: {
        status, 
        rejectionReason:
          status === VerificationStatus.REJECTED
            ? reason ?? 'Rejected by admin'
            : null,

        reviewedAt: new Date(),
      },
    });
  }
}