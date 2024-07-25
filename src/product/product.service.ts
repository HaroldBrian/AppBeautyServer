import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: createProductDto.shopId },
    });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });

    return product;
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        shop: true,
        productCategory: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        shop: true,
        productCategory: true,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async findByShop(id: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.prisma.product.findMany({
      where: { shopId: id },
      include: {
        shop: true,
        productCategory: true,
      },
    });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
      },
    });

    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
