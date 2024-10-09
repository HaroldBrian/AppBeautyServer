export interface InitiatePaymentDto {
  currency?: string;
  amount: number;
  phone: string;
  email: string;
  description?: string;
  reference?: string;
}

export interface ReferencePaymentDto {
  reference: string;
}

export interface CompletePaymentDto {
  reference: string;
  channel: string;
  phone: string;
}
