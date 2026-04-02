import { Module } from '@nestjs/common';
import { VendorVerificationService } from './application/vendor.verification.service';
import { VendorVerificationController } from './presentation/vendor.verify.controller';
import { VendorVerificationRepository } from './infrastructure/repositories/vendor.verification.repository';

@Module({
  controllers: [VendorVerificationController],
  providers: [
    VendorVerificationService,
    {
      provide: 'IVendorVerificationRepository',
      useClass: VendorVerificationRepository,
    },
  ],
})
export class VendorVerificationModule {}