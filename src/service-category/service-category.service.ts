/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from './dto';

@Injectable()
export class ServiceCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.serviceCategory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.serviceCategory.findUnique({ where: { id } });
  }

  async create(data: CreateServiceCategoryDto) {
    return this.prisma.serviceCategory.create({ data: { ...data} });
  }

  async update(id: number, data: UpdateServiceCategoryDto) {
    return this.prisma.serviceCategory.update({ where: { id }, data });
  }

  async remove(id: number) {
    const data = await this.prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!data)
      throw new HttpException(
        "There's no category with id " + id,
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.serviceCategory.delete({ where: { id } });
  }
}
