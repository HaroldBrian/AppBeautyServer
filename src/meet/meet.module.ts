import { Module } from '@nestjs/common';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MeetController],
  providers: [MeetService, PrismaService],
})
export class MeetModule {}
