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
exports.TownsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TownsService = class TownsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllTowns() {
        return this.prisma.town.findMany();
    }
    async getTownById(id) {
        return this.prisma.town.findUnique({
            where: { id },
        });
    }
    async getTownsByCountry(countryId) {
        return this.prisma.town.findMany({
            where: { countryId },
        });
    }
    async createTown(data) {
        return this.prisma.town.create({
            data,
        });
    }
    async updateTown(id, data) {
        return this.prisma.town.update({
            where: { id },
            data,
        });
    }
    async deleteTown(id) {
        const data = await this.prisma.town.findUnique({
            where: { id },
        });
        if (!data)
            throw new common_1.HttpException("There's no town with id " + id, common_1.HttpStatus.NOT_FOUND);
        return this.prisma.town.delete({
            where: { id },
        });
    }
};
exports.TownsService = TownsService;
exports.TownsService = TownsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TownsService);
//# sourceMappingURL=towns.service.js.map