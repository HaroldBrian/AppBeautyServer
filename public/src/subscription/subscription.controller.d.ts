import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
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
    findOne(id: string): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
    findUserSubscriptions(params: {
        userId: string;
    }, query: {
        status?: string;
        limit?: number;
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
    updateSubscription(id: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        subscriptionPlanId: number;
        startDate: Date;
        endDate: Date;
    }>;
    cancelSubscription(id: number): Promise<{
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
