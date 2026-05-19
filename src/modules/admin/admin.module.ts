
import { Module } from '@nestjs/common';

import { AdminController } from './presentation/controllers/admin.controller';
import { AdminVendorVerificationService } from './application/admin.service';
import { AdminVendorVerificationRepository } from './infrastructure/repositories/admin.repository';
import { AdminMapper } from './infrastructure/mapper/admin.mapper';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [
    AdminController,
  ],
  providers: [
    AdminVendorVerificationService,
    AdminMapper,
    PrismaService,
    {
      provide: 'IAdminVendorVerificationRepository',
      useClass: AdminVendorVerificationRepository,
    },
  ],
  exports: [
    AdminVendorVerificationService,
  ],
})
export class AdminModule {}