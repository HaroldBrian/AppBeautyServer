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

  async findUserMeets(query: {
    userId: number | string;
    status?: string;
    limit?: number | string;
  }) {
    let userId = Number(query.userId);

    if (isNaN(userId) || userId <= 0) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
  
    const limit = query.limit ? Number(query.limit) : undefined;
  
    if (limit && (isNaN(limit) || limit <= 0)) {
      throw new HttpException('Limit must be a positive number', HttpStatus.BAD_REQUEST);
    }
  
    const filters: any = {
      userId: userId,
    };
  
    if (query.status) {
      filters.status = query.status;
    }
  
    console.log("Filtres envoyés à Prisma :", filters);
  
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    const meets = await this.prisma.meet.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  
    return meets;
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
