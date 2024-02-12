import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from './service-category.service';

@Module({
  providers: [ServiceCategoryService, PrismaService],
  controllers: [ServiceCategoryController],
})
export class ServiceCategoryModule {}
