import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubscriptionPlanService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    create(data: CreateSubscriptionPlanDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    update(id: number, data: UpdateSubscriptionPlanDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
    remove(id: number): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        price: number;
        duration: number;
    }>;
}
