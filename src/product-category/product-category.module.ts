import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  providers: [ProductCategoryService, PrismaService],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
