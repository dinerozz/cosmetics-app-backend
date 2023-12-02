import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 24, { message: 'Not less than 8 and not more than 24' })
  readonly password: string;

  @ApiProperty({ example: 'Aimira', description: 'name' })
  @IsString({ message: 'Should be a string' })
  readonly fullName: string;

  @ApiProperty({example: "2021-08-31T14:00:00.000Z", description: "Date of birth"})
  dateOfBirth: Date;

  @ApiProperty({ example: 'http://example.com/myprofilepic.jpg', description: 'Profile Image URL' })
  @IsString({ message: 'Should be a string' })
  readonly profileImageUrl: string;
}
