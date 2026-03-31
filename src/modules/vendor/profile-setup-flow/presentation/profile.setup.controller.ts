import { Controller, Post, Body, Request, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileSetupFlowService } from '../application/profile.setup.service';
import { SetupProfileDto } from './dto/profile-setup-flow.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';

@Controller('vendor/profile-setup')
export class ProfileSetupFlowController {
  constructor(private readonly service: ProfileSetupFlowService) {}

  @Post('upload-cover-photo')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('coverImage'))
  @ResponseMessage('Step 1: Profile details saved successfully')
  async setupStepOne(
    @Request() req: any,
    @Body() dto: SetupProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<void> {
    return this.service.saveProfile(req.user.id, dto, file);
  }
}