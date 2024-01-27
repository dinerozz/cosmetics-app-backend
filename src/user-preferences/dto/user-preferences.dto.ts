import { IsString } from "class-validator";

export class UserPreferencesDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly preferenceType: string;

  @IsString()
  readonly preferenceValue: string;
}
