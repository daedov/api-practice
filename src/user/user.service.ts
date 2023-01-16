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
      this.logger.log('User create is running')
      const user = await this.prisma.user.create({ data: createUserDto });
      this.logger.log('User create has been successfully executed')
      return user;
    } catch (error) {
      this.logger.error('Internal server error occurred')
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      this.logger.log('User findAll is running')
      const users = await this.prisma.user.findMany();
      this.logger.log('User findAll has been successfully executed')
      return users;
    } catch (error) {
      this.logger.error('Internal server error occurred')
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    this.logger.warn('User findOne is running')
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      this.logger.error(`User Id ${id} Not Found`)
      throw new NotFoundException(`Id ${id} Not Found`);
    }
    this.logger.log('User findOne has been successfully executed')
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.warn('User update is running')
    await this.findOne(id); 
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    this.logger.log('User update has been successfully executed')
    return user;
  }

  async remove(id: number) {
    this.logger.warn('User remove is running')
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    this.logger.log('User remove has been successfully executed')
    return user;
  }
}
