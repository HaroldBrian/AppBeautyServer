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
exports.ServiceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServiceCategoryService = class ServiceCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.serviceCategory.findMany();
    }
    async findOne(id) {
        return this.prisma.serviceCategory.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.serviceCategory.create({ data: { ...data } });
    }
    async update(id, data) {
        return this.prisma.serviceCategory.update({ where: { id }, data });
    }
    async remove(id) {
        const data = await this.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!data)
            throw new common_1.HttpException("There's no category with id " + id, common_1.HttpStatus.NOT_FOUND);
        return this.prisma.serviceCategory.delete({ where: { id } });
    }
};
exports.ServiceCategoryService = ServiceCategoryService;
exports.ServiceCategoryService = ServiceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceCategoryService);
//# sourceMappingURL=service-category.service.js.map