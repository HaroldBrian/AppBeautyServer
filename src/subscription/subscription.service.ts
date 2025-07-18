import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentsService,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    try {
      const { userId, subscriptionPlanId } = createSubscriptionDto;

      // We Validate user and subscription plan existence
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      const subscriptionPlan = await this.prisma.subscriptionPlan.findUnique({
        where: { id: subscriptionPlanId },
      });

      
      if (!user || !subscriptionPlan) {
        console.log("user not found")
        throw new HttpException(
          'User or Subscription Plan not found',
          HttpStatus.NOT_FOUND,
        );
      }


      // -- Initiating payment
      const payment = await this.paymentService.initializePayment({
        amount: subscriptionPlan.price,
        email: user.email,
        phone: user.telephone,
      });

      if (!payment) {
        throw new HttpException('The payment could not be initialized', HttpStatus.INTERNAL_SERVER_ERROR) 
      }

      const subscription = await this.prisma.subscription.create({
        data: {
          userId,
          subscriptionPlanId,
          startDate: new Date(),
          endDate: new Date(
            Date.now() + subscriptionPlan.duration * 24 * 60 * 60 * 1000,
          ),
          status: 'pending',
        },
      });

      return subscription;
    } catch (error) {
      throw new HttpException('error => ', error) 
    }
  }

  async findAll() {
    return this.prisma.subscription.findMany({});
  }

  async findOne(id: number) {
    const subscription = await this.prisma.subscription.findUnique({ where: { id } });

    if (!subscription) {
      throw new HttpException('subscription not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.subscription.findUnique({
      where: { id },
    });
  }

  async findUserSubscriptions(query: {
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
  
    const subscriptions = await this.prisma.subscription.findMany({
      where: filters,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  
    return subscriptions;
  }

  async updateSubscription(subscriptionId: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }

    const updatedSubscription = await this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: updateSubscriptionDto,
    });

    return updatedSubscription;
  }

  async cancelSubscription(subscriptionId: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }

    const cancelledSubscription = await this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: 'cancelled' },
    });

    return cancelledSubscription;
  }
}
