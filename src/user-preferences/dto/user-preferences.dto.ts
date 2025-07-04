import { IsArray, IsString } from "class-validator";

export class UserPreferencesDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly preferenceType: string;

  @IsArray()
  readonly preferenceValue: string[];
}
