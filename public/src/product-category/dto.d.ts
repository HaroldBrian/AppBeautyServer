export declare class CreateProductCategoryDto {
    label: string;
    description?: string;
}
declare const UpdateProductCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductCategoryDto>>;
export declare class UpdateProductCategoryDto extends UpdateProductCategoryDto_base {
}
export {};
