import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      this.logger.log('Post create is running');
      const post = await this.prisma.post.create({ data: createPostDto });
      this.logger.log('Post create has been successfully executed');
      return post;
    } catch (error) {
      this.logger.error('Internal server error occurred');
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      this.logger.log('Post findAll is running')
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      this.logger.error('Internal server error occurred');
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
        this.logger.log('Post findOne is running')
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      this.logger.error(`Post Id ${id} Not Found`);
      throw new NotFoundException(`Id ${id} Not Found`);
    }
        this.logger.log('Post findOne has been successfully executed')
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    this.logger.warn('Post update is running');
    await this.findOne(id);
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    this.logger.log('Post update has been successfully executed');
    return post;
  }

  async remove(id: number) {
    this.logger.warn('Post remove is running');
    await this.findOne(id);
    const post = await this.prisma.post.delete({ where: { id } });
    this.logger.log('Post remove has been successfully executed');
    return post;
  }
}
