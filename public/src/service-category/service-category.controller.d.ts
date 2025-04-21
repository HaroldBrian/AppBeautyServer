import { CreateServiceCategoryDto, UpdateServiceCategoryDto } from './dto';
import { ServiceCategoryService } from './service-category.service';
export declare class ServiceCategoryController {
    private readonly serviceCategoryService;
    constructor(serviceCategoryService: ServiceCategoryService);
    findAll(): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }[]>;
    findOne(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    remove(id: string): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
}
