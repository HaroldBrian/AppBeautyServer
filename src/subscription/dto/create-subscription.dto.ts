import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  subscriptionPlanId: number;
}
