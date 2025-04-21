import { CompletePaymentDto, CreatePaymentDto, InitiatePaymentDto } from './dto/payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentsService {
    private readonly prisma;
    private readonly apiUrl;
    constructor(prisma: PrismaService);
    initializePayment({ amount, email, phone }: InitiatePaymentDto): Promise<any>;
    createPaymentRow(data: CreatePaymentDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        subscriptionId: number;
        paymentDate: Date;
    }>;
    verifyAndFetchPayment(reference: string): Promise<any>;
    completePayment({ reference, channel, phone }: CompletePaymentDto): Promise<any>;
    listPayments(perpage?: number, page?: number): Promise<any>;
    cancelPayment(reference: string): Promise<any>;
}
