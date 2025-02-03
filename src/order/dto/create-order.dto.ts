export class CreateOrderDto {
  userId: string;
  productId: string;
  quantity: number;
  date: Date;
  reference: string;
}
