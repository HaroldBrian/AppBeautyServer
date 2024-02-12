import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TownsController } from './towns.controller';
import { TownsService } from './towns.service';

@Module({
  controllers: [TownsController],
  providers: [TownsService, PrismaService],
})
export class TownsModule {}
