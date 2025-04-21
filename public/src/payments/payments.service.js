"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.apiUrl = 'https://api.notchpay.co';
    }
    async initializePayment({ amount, email, phone }) {
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
                reference: 'NYANGA-REF.' + (Math.floor(Math.random() * (2000 - 100 + 1)) + 100),
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            const errorMessage = error.response
                ? error.response.data?.message
                : error.message;
            throw new common_1.HttpException(`Payment initialization failed: ${errorMessage}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createPaymentRow(data) {
        return await this.prisma.payment.create({ data: { ...data } });
    }
    async verifyAndFetchPayment(reference) {
        const options = {
            method: 'GET',
            url: `${this.apiUrl}/payments/${reference}`,
            headers: {
                Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            const errorMessage = error.response
                ? error.response.data?.message
                : error.message;
            throw new common_1.HttpException(`Payment verification failed: ${errorMessage}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async completePayment({ reference, channel, phone }) {
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
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            throw new Error(`Payment completion failed: ${errorMessage}`);
        }
    }
    async listPayments(perpage, page) {
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
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            const errorMessage = error.response
                ? error.response.data?.message
                : error.message;
            throw new Error(`Failed to retrieve payment list: ${errorMessage}`);
        }
    }
    async cancelPayment(reference) {
        const options = {
            method: 'DELETE',
            url: `${this.apiUrl}/payments/${reference}`,
            headers: {
                Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            const errorMessage = error.response
                ? error.response.data?.message
                : error.message;
            throw new common_1.HttpException(`Payment cancellation failed: ${errorMessage}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map