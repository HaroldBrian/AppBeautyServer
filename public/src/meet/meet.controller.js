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
exports.MeetController = void 0;
const common_1 = require("@nestjs/common");
const meet_service_1 = require("./meet.service");
const create_meet_dto_1 = require("./dto/create-meet.dto");
const update_meet_dto_1 = require("./dto/update-meet.dto");
let MeetController = class MeetController {
    constructor(meetService) {
        this.meetService = meetService;
    }
    create(createMeetDto) {
        return this.meetService.create(createMeetDto);
    }
    findAll() {
        return this.meetService.findAll();
    }
    findOne(id) {
        return this.meetService.findOne(+id);
    }
    findUserMeets(params, query) {
        const { userId } = params;
        return this.meetService.findUserMeets({
            userId,
            ...query
        });
    }
    update(id, updateMeetDto) {
        return this.meetService.update(+id, updateMeetDto);
    }
    remove(id) {
        return this.meetService.remove(+id);
    }
};
exports.MeetController = MeetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meet_dto_1.CreateMeetDto]),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "findUserMeets", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meet_dto_1.UpdateMeetDto]),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeetController.prototype, "remove", null);
exports.MeetController = MeetController = __decorate([
    (0, common_1.Controller)('api/v1/meet'),
    __metadata("design:paramtypes", [meet_service_1.MeetService])
], MeetController);
//# sourceMappingURL=meet.controller.js.map