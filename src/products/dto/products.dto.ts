import { IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { Column } from "sequelize-typescript";
import { DataTypes } from "sequelize";

export class CreateProductDto {
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
