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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RatingService = class RatingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createRatingDto) {
        return this.prisma.rating.create({
            data: createRatingDto,
        });
    }
    findAll() {
        return this.prisma.rating.findMany();
    }
    findOne(id) {
        return this.prisma.rating.findUnique({
            where: { id },
        });
    }
    async findUserRatings(query) {
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
        const ratings = await this.prisma.rating.findMany({
            where: filters,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        return ratings;
    }
    update(id, updateRatingDto) {
        return this.prisma.rating.update({
            where: { id },
            data: updateRatingDto,
        });
    }
    remove(id) {
        return this.prisma.rating.delete({
            where: { id },
        });
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingService);
//# sourceMappingURL=rating.service.js.map