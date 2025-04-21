/// <reference types="multer" />
import { Prisma } from '@prisma/client';
import { CreateServiceDto } from './dto';
import { ServiceService } from './service.service';
export declare class ServiceController {
    private readonly service;
    constructor(service: ServiceService);
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    findOne(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    findShopServices(params: {
        shopId: string;
    }, query: {
        isVisible?: boolean;
        limit?: number;
    }): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    findcategoryServices(params: {
        categoryId: string;
    }, query: {
        isVisible?: boolean;
        limit?: number;
    }): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }[]>;
    create(createServiceDto: CreateServiceDto, image: Express.Multer.File[]): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    update(id: string, updateServiceDto: Prisma.ServiceUpdateInput): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
    remove(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
        discount: number;
        shopId: number;
        time: number;
        amount: number;
        serviceCategoryId: number;
        isVisible: string;
    }>;
}
