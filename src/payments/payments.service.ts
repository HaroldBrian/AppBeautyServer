import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  CompletePaymentDto,
  CreatePaymentDto,
  InitiatePaymentDto,
} from './dto/payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly apiUrl = 'https://api.notchpay.co';
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async initializePayment({ amount, email, phone }: InitiatePaymentDto) {
    const options = {
      method: 'POST',
      url: this.apiUrl + '/payments/initialize',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
      },
      data: {
        currency: 'XAF',
        amount,
        phone,
        email,
        reference:
          'NYANGA-REF.' + (Math.floor(Math.random() * (2000 - 100 + 1)) + 100),
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message
        : error.message;
      throw new HttpException(
        `Payment initialization failed: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPaymentRow(data: CreatePaymentDto) {
    return await this.prisma.payment.create({ data: { ...data } });
  }

  async verifyAndFetchPayment(reference: string) {
    const options = {
      method: 'GET',
      url: `${this.apiUrl}/payments/${reference}`,
      headers: {
        Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message
        : error.message;
      throw new HttpException(
        `Payment verification failed: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async completePayment({ reference, channel, phone }: CompletePaymentDto) {
    const options = {
      method: 'POST',
      url: `${this.apiUrl}/payments/complete`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
      },
      data: {
        reference,
        channel,
        data: {
          phone,
        },
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      throw new Error(`Payment completion failed: ${errorMessage}`);
    }
  }

  async listPayments(perpage?: number, page?: number) {
    const options = {
      method: 'GET',
      url: `${this.apiUrl}/payments`,
      headers: {
        Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
      },
      params: {
        perpage,
        page,
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message
        : error.message;
      throw new Error(`Failed to retrieve payment list: ${errorMessage}`);
    }
  }

  async cancelPayment(reference: string) {
    const options = {
      method: 'DELETE',
      url: `${this.apiUrl}/payments/${reference}`,
      headers: {
        Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message
        : error.message;
      throw new HttpException(
        `Payment cancellation failed: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
