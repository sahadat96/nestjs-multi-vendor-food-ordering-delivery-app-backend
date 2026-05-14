import { Injectable } from '@nestjs/common';
import { 
    CuisineResponseDto,
 } from '../../presentation/dto/profile-setup-flow.response.dto';
import { 
    VendorProfileSetupView,
    CuisineView,
 } from '../../domain/interface/profile.setup.interface';

import { MediaService } from '@/common/media/media.service';

@Injectable()
export class VendorProfileSetupMapper {
  constructor(private readonly mediaService: MediaService) {}

 toListResponse(cuisines: CuisineView[]): CuisineResponseDto[] {
    return cuisines.map((cuisine) => this.toCuisineResponse(cuisine));
 }

 toCuisineResponse(cuisine: CuisineView): CuisineResponseDto {
    return {
      id: cuisine.id,
      name: cuisine.name,
      imageUrl: cuisine.imageUrl
        ? this.resolveMediaUrl(cuisine.imageUrl)
        : undefined,
      createdAt: cuisine.createdAt,
      updatedAt: cuisine.updatedAt,
    };
  }

  private resolveMediaUrl(path: string): string {
    return this.mediaService.getUrl(path) ?? path;
  }
}