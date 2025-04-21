import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  create(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({
      data: createRatingDto,
    });
  }

  findAll() {
    return this.prisma.rating.findMany();
  }

  findOne(id: number) {
    return this.prisma.rating.findUnique({
      where: { id },
    });
  }

  async findUserRatings(query: {
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
  
    const ratings = await this.prisma.rating.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  
    return ratings;
  }

  update(id: number, updateRatingDto: CreateRatingDto) {
    return this.prisma.rating.update({
      where: { id },
      data: updateRatingDto,
    });
  }

  remove(id: number) {
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
