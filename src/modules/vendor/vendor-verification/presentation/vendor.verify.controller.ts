import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Req,
  UseGuards,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VendorVerificationService } from '../application/vendor.verification.service';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('vendor/verification')
export class VendorVerificationController {
  constructor(private readonly service: VendorVerificationService) {}

  @Post('upload-documents')
  @UseGuards(RoleGuard)
  @Roles(Role.VENDOR)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'businessLicense', maxCount: 1 },
      { name: 'healthPermit', maxCount: 1 },
      { name: 'insuranceProof', maxCount: 1 },
    ]),
  )
  async uploadDocuments(
    @Req() req,
    @UploadedFiles()
    files: {
      businessLicense?: Express.Multer.File[];
      healthPermit?: Express.Multer.File[];
      insuranceProof?: Express.Multer.File[];
    },
  ) {
    return this.service.uploadDocuments(req.user.vendorId, files);
  }
}