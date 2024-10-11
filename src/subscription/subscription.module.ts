import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PaymentsService, PrismaService],
})
export class SubscriptionModule {}
