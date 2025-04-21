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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShopService = class ShopService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShopDto) {
        const { socialNetworks, images, ...shopData } = createShopDto;
        const latestShop = await this.prisma.shop.findFirst({
            orderBy: {
                id: 'desc',
            },
        });
        let nextCodeNumber = 1;
        if (latestShop && latestShop.code) {
            const match = latestShop.code.match(/\d+$/);
            if (match) {
                nextCodeNumber = parseInt(match[0]) + 1;
            }
        }
        const uniqueCode = `SHOP-${nextCodeNumber.toString().padStart(5, '0')}`;
        const shop = await this.prisma.shop.create({
            data: {
                ...shopData,
                code: uniqueCode,
                socialNetworks: socialNetworks.map((url) => ({ url })) || undefined,
                images: images.map((url) => ({ url })) || undefined,
            },
        });
        return shop;
    }
    async findAll() {
        return this.prisma.shop.findMany({});
    }
    async findOne(id) {
        const shop = await this.prisma.shop.findUnique({ where: { id } });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.shop.findUnique({
            where: { id },
        });
    }
    async findUserShops(query) {
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
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const shops = await this.prisma.shop.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return shops;
    }
    async update(id, updateShopDto) {
        const item = await this.prisma.shop.findUnique({ where: { id } });
        if (!item) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const { socialNetworks, images, ...shopData } = updateShopDto;
        const shop = await this.prisma.shop.update({
            where: { id },
            data: {
                ...shopData,
                socialNetworks: socialNetworks.map((url) => ({ url })),
                images: images.map((url) => ({ url })),
            },
        });
        return shop;
    }
    async delete(id) {
        const shop = await this.prisma.shop.findUnique({ where: { id } });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.shop.delete({ where: { id } });
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopService);
//# sourceMappingURL=shop.service.js.map