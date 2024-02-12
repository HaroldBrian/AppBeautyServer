/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { storeImages } from 'utils/storageUtils';
import { CreateServiceDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: number) {
    return this.prisma.service.findUnique({ where: { id } });
  }

  async create(data: CreateServiceDto) {
    const { image, amount, time, discount, categoryId, userId, ...rest } = data;

    const parsedData = {
      ...rest,
      amount: +amount,
      time: +time,
      discount: +discount,
      categoryId: +categoryId,
      userId: +userId
    };
    

    const uploadedImages = await storeImages(image);

    const createdService = await this.prisma.service.create({
      data: { ...parsedData, images: JSON.stringify(uploadedImages) },
    });

    return createdService;
  }

  async update(id: number, data: Prisma.ServiceUpdateInput) {
    return this.prisma.service.update({ where: { id }, data });
  }

  async delete(id: number) {
    const data = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!data)
      throw new HttpException(
        "There's no service with id " + id,
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.service.delete({ where: { id } });
  }
}
