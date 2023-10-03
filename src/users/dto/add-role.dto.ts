import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;
  @ApiProperty({ example: '1', description: 'UserId' })
  @IsString({ message: 'Should be a string' })
  readonly userId: string;
}
