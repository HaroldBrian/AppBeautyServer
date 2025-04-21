import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto';
import { ProductCategoryService } from './product-category.service';
export declare class ProductCategoryController {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
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
    create(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        description: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        image: string;
    }>;
    update(id: string, updateProductCategoryDto: UpdateProductCategoryDto): Promise<{
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
