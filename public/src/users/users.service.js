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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updatePassword(payload, id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await (0, bcrypt_1.compare)(payload.old_password, user.password);
        if (!areEqual) {
            throw new common_1.HttpException('invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return await this.prisma.user.update({
            where: { id },
            data: { password: await (0, bcrypt_1.hash)(payload.new_password, 10) },
        });
    }
    async updateProfile(id, updateProfileDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.user.update({
            where: { id },
            data: updateProfileDto,
        });
    }
    async profile(user_id) {
        return await this.prisma.user.findFirst({
            where: { id: user_id },
            select: {
                name: true,
                email: true,
                surname: true,
                telephone: true,
                role: true,
            },
        });
    }
    async getUsers() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                surname: true,
                telephone: true,
                role: true,
            },
        });
    }
    async getClients() {
        return await this.prisma.user.findMany({
            where: { role: 'CLIENT' },
            select: {
                id: true,
                name: true,
                email: true,
                surname: true,
                telephone: true,
                role: true,
            },
        });
    }
    async getProviders() {
        return await this.prisma.user.findMany({
            where: { role: 'PROVIDER' },
            select: {
                id: true,
                name: true,
                email: true,
                surname: true,
                telephone: true,
                role: true,
            },
        });
    }
    async getAdmins() {
        return await this.prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: {
                id: true,
                name: true,
                email: true,
                surname: true,
                telephone: true,
                role: true,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map