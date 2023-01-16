import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger 
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    this.logger.log('Ejecutando findOne de User service')
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      this.logger.error(`Id ${id} Not Found`)
      throw new NotFoundException(`Id ${id} Not Found`);
    }
    this.logger.log('Ejecutado con exito findOne de User service')
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); 
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
