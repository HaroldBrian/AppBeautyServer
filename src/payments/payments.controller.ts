import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CompletePaymentDto,
  InitiatePaymentDto,
} from './dto/payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payment API')
@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initialize')
  async initializePayment(@Body() payload: InitiatePaymentDto) {
    return this.paymentsService.initializePayment(payload);
  }

  @Get('verify/:reference')
  async verifyPayment(@Param('reference') reference: string) {
    return this.paymentsService.verifyAndFetchPayment(reference);
  }

  @Post('complete')
  async completePayment(@Body() payload: CompletePaymentDto) {
    return this.paymentsService.completePayment(payload);
  }

  @Get('list')
  async listPayments(@Body() paginationDto: { perpage?: number; page?: number }) {
    return this.paymentsService.listPayments(
      paginationDto.perpage,
      paginationDto.page,
    );
  }

  @Delete('cancel/:reference')
  async cancelPayment(@Param('reference') reference: string) {
    return this.paymentsService.cancelPayment(reference);
  }
}
