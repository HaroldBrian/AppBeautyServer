import { IsOptional } from "class-validator";

export class CreateSubscriptionPlanDto {
    label: string;
    price: number;
    duration: number;
    @IsOptional()
    description?: string;
}