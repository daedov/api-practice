import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {

  private readonly logger = new Logger(PostService.name)

  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({ data: createPostDto });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);    
    }
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Id ${id} Not Found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return post;
  }

  async remove(id: number) {
    await this.findOne(id);
    const post = await this.prisma.post.delete({ where: { id } });
    return post;
  }
}
