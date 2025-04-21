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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TownsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const towns_service_1 = require("./towns.service");
let TownsController = class TownsController {
    constructor(townsService) {
        this.townsService = townsService;
    }
    async getAllTowns() {
        return this.townsService.getAllTowns();
    }
    async getTownById(id) {
        return this.townsService.getTownById(Number(id));
    }
    async getTownsByCountry(countryId) {
        return this.townsService.getTownsByCountry(Number(countryId));
    }
    async createTown(town) {
        return this.townsService.createTown(town);
    }
    async updateTown(id, townData) {
        return this.townsService.updateTown(Number(id), townData);
    }
    async deleteTown(id) {
        return this.townsService.deleteTown(Number(id));
    }
};
exports.TownsController = TownsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "getAllTowns", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "getTownById", null);
__decorate([
    (0, common_1.Get)('country/:countryId'),
    __param(0, (0, common_1.Param)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "getTownsByCountry", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "createTown", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "updateTown", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TownsController.prototype, "deleteTown", null);
exports.TownsController = TownsController = __decorate([
    (0, swagger_1.ApiTags)("Town management"),
    (0, common_1.Controller)('api/v1/towns'),
    __metadata("design:paramtypes", [towns_service_1.TownsService])
], TownsController);
//# sourceMappingURL=towns.controller.js.map