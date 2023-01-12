import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({ default: 1 })
  id: number;
  @ApiProperty({ default: 'marcos@correo.com' })
  email: string;
  @ApiProperty({ default: 'Marcos' })
  name: string;
}
