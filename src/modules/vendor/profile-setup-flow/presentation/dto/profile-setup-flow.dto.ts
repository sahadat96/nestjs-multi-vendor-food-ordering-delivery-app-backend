import { IsString, IsEmail, IsOptional, IsArray, IsUrl, ValidateNested } from 'class-validator';
import { Type, Transform, plainToInstance  } from 'class-transformer';

export class SocialLinkDto {
  @IsUrl() url: string;
}

export class SetupProfileDto {
  @IsString() businessName: string;
  @IsEmail() publicEmail: string;
  @IsString() contactNumber: string;
  @IsString() bio: string;

  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  cuisines: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  
   @Transform(({ value }) => {
    const arr = typeof value === 'string' ? JSON.parse(value) : value;
    return arr.map((item: any) => plainToInstance(SocialLinkDto, item));
  })
  socialLinks?: SocialLinkDto[];
}