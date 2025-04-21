export declare class CreateServiceCategoryDto {
    label: string;
    description?: string;
}
declare const UpdateServiceCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceCategoryDto>>;
export declare class UpdateServiceCategoryDto extends UpdateServiceCategoryDto_base {
}
export {};
