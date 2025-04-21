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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const shop = await this.prisma.shop.findUnique({
            where: { id: createProductDto.shopId },
        });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const product = await this.prisma.product.create({
            data: {
                ...createProductDto,
            },
        });
        return product;
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                shop: true,
                productCategory: true,
            },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                shop: true,
                productCategory: true,
            },
        });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async findByShop(id) {
        const shop = await this.prisma.shop.findUnique({ where: { id } });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const product = await this.prisma.product.findMany({
            where: { shopId: id },
            include: {
                shop: true,
                productCategory: true,
            },
        });
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.prisma.product.update({
            where: { id },
            data: {
                ...updateProductDto,
            },
        });
        return product;
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map