import { SubscriptionPlanService } from './subscription-plan.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
export declare class SubscriptionPlanController {
    private readonly subscriptionPlanService;
    constructor(subscriptionPlanService: SubscriptionPlanService);
    create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    remove(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
}
