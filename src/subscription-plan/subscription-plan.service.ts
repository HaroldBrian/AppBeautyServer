import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionPlanService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subscriptionPlan.findMany();
  }

  async findOne(id: number) {
    return this.prisma.subscriptionPlan.findUnique({ where: { id } });
  }

  async create(data: CreateSubscriptionPlanDto) {
    return this.prisma.subscriptionPlan.create({ data: { ...data } });
  }

  async update(id: number, data: UpdateSubscriptionPlanDto) {
    return this.prisma.subscriptionPlan.update({ where: { id }, data });
  }

  async remove(id: number) {
    const data = await this.prisma.subscriptionPlan.findUnique({
      where: { id },
    });

    if (!data)
      throw new HttpException(
        "There's no subscription plan with id " + id,
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.subscriptionPlan.delete({ where: { id } });
  }
}
