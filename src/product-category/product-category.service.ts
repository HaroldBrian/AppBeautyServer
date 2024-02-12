/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productCategory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.productCategory.findUnique({ where: { id } });
  }

  async create(data: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({ data });
  }

  async update(id: number, data: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({ where: { id }, data });
  }

  async remove(id: number) {
    const data = await this.prisma.productCategory.findUnique({
      where: { id },
    });

    if (!data) throw new HttpException("There's no category with id " + id, HttpStatus.NOT_FOUND);

    return this.prisma.productCategory.delete({ where: { id } });
  }
}
