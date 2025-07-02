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
exports.MeetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mailSender_1 = require("../../utils/mailSender");
const path = require("path");
const fs = require("fs");
let MeetService = class MeetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.meet.findMany();
    }
    async findOne(id) {
        return this.prisma.meet.findUnique({ where: { id } });
    }
    async findUserMeets(query) {
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
        const meets = await this.prisma.meet.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return meets;
    }
    async create(data) {
        const service = await this.prisma.service.findUnique({
            where: { id: data.serviceId },
        });
        if (!service) {
            throw new common_1.HttpException('Service not found', common_1.HttpStatus.NOT_FOUND);
        }
        const shop = await this.prisma.shop.findUnique({
            where: { id: service.shopId },
        });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const userShop = await this.prisma.user.findUnique({
            where: { id: shop.userId },
        });
        const user = await this.prisma.user.findUnique({
            where: { id: data.userId },
        });
        const createMeet = await this.prisma.meet.create({ data: { ...data } });
        const templatePath = path.resolve(__dirname, '..', '..', '..', 'src', 'templates', 'meet-pending.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        await (0, mailSender_1.mailSender)(userShop.email, 'Nouvelle demande de rendez-vous', template);
        await (0, mailSender_1.mailSender)(user.email, 'Nouvelle demande de rendez-vous', template);
        return createMeet;
    }
    async update(id, data) {
        const service = await this.prisma.service.findUnique({
            where: { serviceId: data.serviceId },
        });
        if (!service) {
            throw new common_1.HttpException('Service not found', common_1.HttpStatus.NOT_FOUND);
        }
        const shop = await this.prisma.shop.findUnique({
            where: { id: service.shopId },
        });
        if (!shop) {
            throw new common_1.HttpException('Shop not found', common_1.HttpStatus.NOT_FOUND);
        }
        const userShop = await this.prisma.user.findUnique({
            where: { id: shop.userId },
        });
        const user = await this.prisma.user.findUnique({
            where: { id: data.userId },
        });
        const updateMeet = await this.prisma.meet.update({ where: { id }, data });
        const templatePath = path.resolve(__dirname, '..', '..', '..', 'src', 'templates', 'meet-update.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        await (0, mailSender_1.mailSender)(userShop.email, 'Modification de rendez-vous', template);
        await (0, mailSender_1.mailSender)(user.email, 'Modification de rendez-vous', template);
        return updateMeet;
    }
    async remove(id) {
        const data = await this.prisma.meet.findUnique({
            where: { id },
        });
        if (!data)
            throw new common_1.HttpException("There's no meet with id " + id, common_1.HttpStatus.NOT_FOUND);
        return this.prisma.meet.delete({ where: { id } });
    }
};
exports.MeetService = MeetService;
exports.MeetService = MeetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeetService);
//# sourceMappingURL=meet.service.js.map