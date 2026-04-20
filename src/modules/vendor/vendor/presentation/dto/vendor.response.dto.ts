export class VendorMenuProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  estimateCookTime!: number;
  image?: string;
  categoryName?: string;
}

export class VendorMenuSectionResponseDto {
  categoryId!: string;
  categoryName!: string;
  products!: VendorMenuProductResponseDto[];
}

export class VendorMenuVendorInfoResponseDto {
  id!: string;
  businessName!: string;
  coverImage?: string;
  bio?: string;
  cityLabel?: string;
  distanceKm?: number;
  isOpen!: boolean;
  statusLabel!: string;
  reviewAverage!: number;
  reviewCount!: number;
  cuisines!: string[];
}

export class VendorMenuResponseDto {
  vendor!: VendorMenuVendorInfoResponseDto;
  sections!: VendorMenuSectionResponseDto[];
}

export class VendorInfoOpeningHourResponseDto {
  dayOfWeek!: number;
  dayLabel!: string;
  openTime?: string | null;
  closeTime?: string | null;
  isClosed!: boolean;
}

export class VendorInfoSocialLinkResponseDto {
  platform!: string;
  url!: string;
}

export class VendorInfoResponseDto {
  id!: string;
  bio?: string;
  publicEmail?: string;
  contactNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  openingHours!: VendorInfoOpeningHourResponseDto[];
  socialLinks!: VendorInfoSocialLinkResponseDto[];
}