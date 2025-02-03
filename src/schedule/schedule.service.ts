import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  findAll() {
    return this.prisma.schedule.findMany();
  }

  findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  update(id: string, updateScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  remove(id: string) {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
