import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.prisma.rating.findUnique({
      where: { id },
    });
  }

  update(id: string, updateRatingDto: CreateRatingDto) {
    return this.prisma.rating.update({
      where: { id },
      data: updateRatingDto,
    });
  }

  remove(id: string) {
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
