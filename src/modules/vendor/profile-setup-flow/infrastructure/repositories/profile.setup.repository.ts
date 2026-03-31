import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProfileSetupRepository } from '../../domain/interface/profile.setup.interface';
import { SetupProfileDto } from '../../presentation/dto/profile-setup-flow.dto';

@Injectable()
export class ProfileSetupRepository implements IProfileSetupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfileAndSyncRelations(vendorId: string, data: SetupProfileDto, imageUrl?: string): Promise<void> {
    
    const { socialLinks, cuisines, ...profileData } = data;

    await this.prisma.$transaction(async (tx) => {

      await tx.vendor.update({
        where: { id: vendorId },
        data: {
          ...profileData,
          coverImage: imageUrl ?? undefined,
          onboardingStep: 2, 
        },
      });

      if (socialLinks) {
        await tx.socialLink.deleteMany({ where: { vendorId } });
        await tx.socialLink.createMany({
          data: socialLinks.map((link) => ({ ...link, vendorId })),
        });
      }

      await tx.vendorCuisine.deleteMany({ where: { vendorId } });
      for (const name of cuisines) {
        await tx.vendorCuisine.create({
          data: {
            vendor: { connect: { id: vendorId } },
            cuisine: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
          },
        });
      }
    });
  }
}