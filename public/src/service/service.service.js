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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const storageUtils_1 = require("../../utils/storageUtils");
let ServiceService = class ServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.service.findMany();
    }
    async findOne(id) {
        return this.prisma.service.findUnique({ where: { id } });
    }
    async findShopServices(query) {
        let shopId = Number(query.shopId);
        if (isNaN(shopId) || shopId <= 0) {
            throw new common_1.HttpException('Invalid shop ID', common_1.HttpStatus.BAD_REQUEST);
        }
        const limit = query.limit ? Number(query.limit) : undefined;
        if (limit && (isNaN(limit) || limit <= 0)) {
            throw new common_1.HttpException('Limit must be a positive number', common_1.HttpStatus.BAD_REQUEST);
        }
        const filters = {
            shopId: shopId,
        };
        if (query.isVisible) {
            filters.isVisible = query.isVisible;
        }
        const user = await this.prisma.shop.findUnique({
            where: { id: shopId },
        });
        if (!user) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const services = await this.prisma.service.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return services;
    }
    async findCategoryServices(query) {
        let categoryId = Number(query.categoryId);
        if (isNaN(categoryId) || categoryId <= 0) {
            throw new common_1.HttpException('Invalid Category ID', common_1.HttpStatus.BAD_REQUEST);
        }
        const limit = query.limit ? Number(query.limit) : undefined;
        if (limit && (isNaN(limit) || limit <= 0)) {
            throw new common_1.HttpException('Limit must be a positive number', common_1.HttpStatus.BAD_REQUEST);
        }
        const filters = {
            serviceCategoryId: categoryId,
        };
        if (query.isVisible) {
            filters.isVisible = query.isVisible;
        }
        const user = await this.prisma.serviceCategory.findUnique({
            where: { id: categoryId },
        });
        if (!user) {
            throw new common_1.HttpException('category not found', common_1.HttpStatus.NOT_FOUND);
        }
        const services = await this.prisma.service.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return services;
    }
    async create(data) {
        const { image, amount, time, discount, serviceCategoryId, shopId, ...rest } = data;
        const parsedData = {
            ...rest,
            amount: +amount,
            time: +time,
            discount: +discount,
            serviceCategoryId: +serviceCategoryId,
            shopId: +shopId,
        };
        const uploadedImages = await (0, storageUtils_1.storeImages)(image);
        const createdService = await this.prisma.service.create({
            data: { ...parsedData, image: JSON.stringify(uploadedImages) },
        });
        return createdService;
    }
    async update(id, data) {
        return this.prisma.service.update({ where: { id }, data });
    }
    async delete(id) {
        const data = await this.prisma.service.findUnique({
            where: { id },
        });
        if (!data)
            throw new common_1.HttpException("There's no service with id " + id, common_1.HttpStatus.NOT_FOUND);
        return this.prisma.service.delete({ where: { id } });
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceService);
//# sourceMappingURL=service.service.js.map