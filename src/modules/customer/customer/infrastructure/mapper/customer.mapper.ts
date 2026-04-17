import { CustomerEntity } from '../../domain/entities/customer.entity';
import {
  CustomerResponseDto,
  NearbyVendorCardResponseDto,
} from '../../presentation/dto/customer.response.dto';

export class CustomerMapper {
  static toResponse(entity: CustomerEntity): CustomerResponseDto {
    return {
      id: entity.id,
      latitude: entity.latitude,
      longitude: entity.longitude,
      address: entity.address,
    };
  }

  static toNearbyVendorCard(vendor: any): NearbyVendorCardResponseDto {
    return {
      id: vendor.id,
      businessName: vendor.businessName ?? 'Unnamed Vendor',
      coverImage:
        vendor.coverImage ??
        vendor.products?.[0]?.images?.[0]?.url ??
        undefined,
      distanceKm: Number(vendor.distanceKm.toFixed(1)),
      cityLabel: CustomerMapper.extractCityLabel(vendor.serviceArea?.address),
      isOpen: vendor.availability?.isOpen ?? false,
      statusLabel: vendor.availability?.label ?? 'Unknown',
      cuisines: vendor.cuisines?.map((item: any) => item.cuisine.name) ?? [],
    };
  }

  private static extractCityLabel(
    address?: string | null,
  ): string | undefined {
    if (!address) {
      return undefined;
    }

    return address.split(',')[0]?.trim() || undefined;
  }
}