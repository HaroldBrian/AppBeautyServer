
export class CreateOrderDto {
  userId: number;
  productId: number;
  quantity: number;
  totalAmount: number; 
  status: string;
  reference: string;
}
