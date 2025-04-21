export declare class CreateProductDto {
    name: string;
    quantity: number;
    price: number;
    discount?: number;
    images: string[];
    description: string;
    status: string;
    shopId: number;
    productCategoryId: number;
}
