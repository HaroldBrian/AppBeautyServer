import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
