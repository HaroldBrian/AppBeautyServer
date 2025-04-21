"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TownsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const towns_controller_1 = require("./towns.controller");
const towns_service_1 = require("./towns.service");
let TownsModule = class TownsModule {
};
exports.TownsModule = TownsModule;
exports.TownsModule = TownsModule = __decorate([
    (0, common_1.Module)({
        controllers: [towns_controller_1.TownsController],
        providers: [towns_service_1.TownsService, prisma_service_1.PrismaService],
    })
], TownsModule);
//# sourceMappingURL=towns.module.js.map