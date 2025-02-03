import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';

@Injectable()
export class MeetService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.meet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.meet.findUnique({ where: { id } });
  }

  async create(data: CreateMeetDto) {
    return this.prisma.meet.create({ data: { ...data} });
  }

  async update(id: number, data: UpdateMeetDto) {
    return this.prisma.meet.update({ where: { id }, data });
  }

  async remove(id: number) {
    const data = await this.prisma.meet.findUnique({
      where: { id },
    });

    if (!data)
      throw new HttpException(
        "There's no category with id " + id,
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.serviceCategory.delete({ where: { id } });
  }
}
