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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const payments_service_1 = require("../payments/payments.service");
let SubscriptionService = class SubscriptionService {
    constructor(prisma, paymentService) {
        this.prisma = prisma;
        this.paymentService = paymentService;
    }
    async createSubscription(createSubscriptionDto) {
        try {
            const { userId, subscriptionPlanId } = createSubscriptionDto;
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const subscriptionPlan = await this.prisma.subscriptionPlan.findUnique({
                where: { id: subscriptionPlanId },
            });
            if (!user || !subscriptionPlan) {
                console.log("user not found");
                throw new common_1.HttpException('User or Subscription Plan not found', common_1.HttpStatus.NOT_FOUND);
            }
            const payment = await this.paymentService.initializePayment({
                amount: subscriptionPlan.price,
                email: user.email,
                phone: user.telephone,
            });
            if (!payment) {
                throw new common_1.HttpException('The payment could not be initialized', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const subscription = await this.prisma.subscription.create({
                data: {
                    userId,
                    subscriptionPlanId,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + subscriptionPlan.duration * 24 * 60 * 60 * 1000),
                    status: 'pending',
                },
            });
            return subscription;
        }
        catch (error) {
            throw new common_1.HttpException('error => ', error);
        }
    }
    async findAll() {
        return this.prisma.subscription.findMany({});
    }
    async findOne(id) {
        const subscription = await this.prisma.subscription.findUnique({ where: { id } });
        if (!subscription) {
            throw new common_1.HttpException('subscription not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.subscription.findUnique({
            where: { id },
        });
    }
    async findUserSubscriptions(query) {
        let userId = Number(query.userId);
        if (isNaN(userId) || userId <= 0) {
            throw new common_1.HttpException('Invalid user ID', common_1.HttpStatus.BAD_REQUEST);
        }
        const limit = query.limit ? Number(query.limit) : undefined;
        if (limit && (isNaN(limit) || limit <= 0)) {
            throw new common_1.HttpException('Limit must be a positive number', common_1.HttpStatus.BAD_REQUEST);
        }
        const filters = {
            userId: userId,
        };
        if (query.status) {
            filters.status = query.status;
        }
        console.log("Filtres envoyés à Prisma :", filters);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const subscriptions = await this.prisma.subscription.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return subscriptions;
    }
    async updateSubscription(subscriptionId, updateSubscriptionDto) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { id: subscriptionId },
        });
        if (!subscription) {
            throw new common_1.HttpException('Subscription not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedSubscription = await this.prisma.subscription.update({
            where: { id: subscriptionId },
            data: updateSubscriptionDto,
        });
        return updatedSubscription;
    }
    async cancelSubscription(subscriptionId) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { id: subscriptionId },
        });
        if (!subscription) {
            throw new common_1.HttpException('Subscription not found', common_1.HttpStatus.NOT_FOUND);
        }
        const cancelledSubscription = await this.prisma.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'cancelled' },
        });
        return cancelledSubscription;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payments_service_1.PaymentsService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map