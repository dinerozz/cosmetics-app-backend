import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'UserId' })
  readonly userId: string;
  @ApiProperty({ example: 'Scam', description: 'Ban reason' })
  readonly reason: string;
}
