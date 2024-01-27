import { IsNumber, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class UpdateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  readonly productName: string;

  @IsUrl()
  @IsOptional()
  readonly imageUrl?: string;

  @IsUUID()
  readonly categoryId: string;

  @IsString()
  skinType: string;

  @IsString()
  hairType: string;

  @IsString()
  specialConditions: string;

  @IsString()
  purpose: string;
}
