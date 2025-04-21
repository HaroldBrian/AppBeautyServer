import { CompletePaymentDto, InitiatePaymentDto } from './dto/payment.dto';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    initializePayment(payload: InitiatePaymentDto): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    completePayment(payload: CompletePaymentDto): Promise<any>;
    listPayments(paginationDto: {
        perpage?: number;
        page?: number;
    }): Promise<any>;
    cancelPayment(reference: string): Promise<any>;
}
