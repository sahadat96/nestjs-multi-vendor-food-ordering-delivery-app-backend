import { Module } from '@nestjs/common';
import { ProfileSetupFlowController } from './presentation/profile.setup.controller';
import { ProfileSetupFlowService } from './application/profile.setup.service';
import { ProfileSetupRepository } from './infrastructure/repositories/profile.setup.repository';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [
    StorageModule, 
  ],
  controllers: [
    ProfileSetupFlowController
  ],
  providers: [
    ProfileSetupFlowService,
    {
      provide: 'IProfileSetupRepository',
      useClass: ProfileSetupRepository,
    },
  ],
  
  exports: [ProfileSetupFlowService],
})
export class VendorProfileSetupModule {}