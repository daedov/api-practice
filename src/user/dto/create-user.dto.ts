import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
