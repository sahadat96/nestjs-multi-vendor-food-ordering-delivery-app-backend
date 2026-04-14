import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class AddCartItemDto {
  @IsUUID()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsUUID()
  sizeOptionId?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  choiceOptionIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  addOnIds?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class CartItemChoiceOptionDto {
  @IsUUID()
  choiceOptionId!: string;
}

export class CartItemAddOnDto {
  @IsUUID()
  addOnId!: string;
}