import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async create(createShopDto: CreateShopDto) {
    const { socialNetworks, images, ...shopData } = createShopDto;
    const latestShop = await this.prisma.shop.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    let nextCodeNumber = 1;
    if (latestShop && latestShop.code) {
      const match = latestShop.code.match(/\d+$/);
      if (match) {
        nextCodeNumber = parseInt(match[0]) + 1;
      }
    }
    
    const uniqueCode = `SHOP-${nextCodeNumber.toString().padStart(5, '0')}`;

    const shop = await this.prisma.shop.create({
      data: {
        ...shopData,
        code: uniqueCode,
        socialNetworks: socialNetworks.map((url) => ({ url })) ||  undefined,
        images: images.map((url) => ({ url })) || undefined,
      },
    });
    return shop;
  }

  async findAll() {
    return this.prisma.shop.findMany({});
  }

  async findOne(id: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.shop.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const item = await this.prisma.shop.findUnique({ where: { id } });

    if (!item) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const { socialNetworks, images, ...shopData } = updateShopDto;
    const shop = await this.prisma.shop.update({
      where: { id },
      data: {
        ...shopData,
        socialNetworks: socialNetworks.map((url) => ({ url })),
        images: images.map((url) => ({ url })),
      },
    });
    return shop;
  }

  async delete(id: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });

    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.shop.delete({ where: { id } });
  }
}
