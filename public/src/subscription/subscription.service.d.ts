import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';
export declare class SubscriptionService {
    private readonly prisma;
    private readonly paymentService;
    constructor(prisma: PrismaService, paymentService: PaymentsService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
    findAll(): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
    findUserSubscriptions(query: {
        userId: number | string;
        status?: string;
        limit?: number | string;
    }): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }[]>;
    updateSubscription(subscriptionId: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
    cancelSubscription(subscriptionId: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
}
