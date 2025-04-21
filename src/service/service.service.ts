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

  async findShopServices(query: {
    shopId: number | string;
    isVisible?: boolean;
    limit?: number | string;
  }) {
    let shopId = Number(query.shopId);

    if (isNaN(shopId) || shopId <= 0) {
      throw new HttpException('Invalid shop ID', HttpStatus.BAD_REQUEST);
    }
  
    const limit = query.limit ? Number(query.limit) : undefined;
  
    if (limit && (isNaN(limit) || limit <= 0)) {
      throw new HttpException('Limit must be a positive number', HttpStatus.BAD_REQUEST);
    }
  
    const filters: any = {
      shopId: shopId,
    };
  
    if (query.isVisible) {
      filters.isVisible = query.isVisible;
    }
  
    const user = await this.prisma.shop.findUnique({
      where: { id: shopId },
    });
  
    if (!user) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
  
    const services = await this.prisma.service.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  
    return services;
  }

  async findCategoryServices(query: {
    categoryId: number | string;
    isVisible?: boolean;
    limit?: number | string;
  }) {
    let categoryId = Number(query.categoryId);

    if (isNaN(categoryId) || categoryId <= 0) {
      throw new HttpException('Invalid Category ID', HttpStatus.BAD_REQUEST);
    }
  
    const limit = query.limit ? Number(query.limit) : undefined;
  
    if (limit && (isNaN(limit) || limit <= 0)) {
      throw new HttpException('Limit must be a positive number', HttpStatus.BAD_REQUEST);
    }
  
    const filters: any = {
      serviceCategoryId: categoryId,
    };
  
    if (query.isVisible) {
      filters.isVisible = query.isVisible;
    }
  
    const user = await this.prisma.serviceCategory.findUnique({
      where: { id: categoryId },
    });
  
    if (!user) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
  
    const services = await this.prisma.service.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  
    return services;
  }

  async create(data: CreateServiceDto) {
    const { image, amount, time, discount, serviceCategoryId, shopId, ...rest } = data;

    const parsedData = {
      ...rest,
      amount: +amount,
      time: +time,
      discount: +discount,
      serviceCategoryId: +serviceCategoryId,
      shopId: +shopId,
    };
    

    const uploadedImages = await storeImages(image);

    const createdService = await this.prisma.service.create({
      data: { ...parsedData, image: JSON.stringify(uploadedImages) },
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
