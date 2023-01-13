import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ default: 'marcos@correo.com' })
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Marcos Pérez' })
  name: string;
}
