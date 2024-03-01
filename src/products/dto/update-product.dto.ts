import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from "class-validator";
import {
  AgeGroup,
  EthicalPreferences,
  HairType,
  Ingredients,
  ProductPurpose,
  SkinConcern,
  SkinType,
  UsageTime,
} from "../products.model";

export class UpdateProductDto {
  @IsUUID()
  readonly categoryId: string;

  @IsString()
  readonly productName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsUrl()
  @IsOptional()
  readonly imageURL?: string;

  @IsEnum(SkinType)
  skinType: SkinType[];

  @IsEnum(HairType)
  hairType: HairType[];

  @IsString()
  @IsOptional()
  specialConditions?: string;

  @IsEnum(UsageTime)
  usageTime: UsageTime[];

  @IsString()
  @IsOptional()
  season?: string;

  @IsArray()
  @IsEnum(Ingredients, { each: true })
  ingredients: Ingredients[];

  @IsArray()
  @IsEnum(EthicalPreferences, { each: true })
  ethicalPreferences: EthicalPreferences[];

  @IsEnum(ProductPurpose)
  purpose: ProductPurpose[];

  @IsString()
  brand: string;

  @IsEnum(AgeGroup)
  ageGroup: AgeGroup[];

  @IsEnum(SkinConcern)
  @IsOptional()
  skinConcern?: SkinConcern[];
}
