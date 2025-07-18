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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mail_dto_1 = require("./dto/mail.dto");
const swagger_1 = require("@nestjs/swagger");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMail(body) {
        try {
            if (!body.to || !body.subject || !body.template) {
                throw new common_1.BadRequestException('Fields required.');
            }
            await this.mailService.sendMail(body.to, body.subject, body.template, body.context, body.attachments);
            return { message: `Email envoyé à ${body.to}` };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            throw new common_1.HttpException(`Erreur lors de l'envoi de l'email : ${errorMessage}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendBulk(body) {
        try {
            if (!body.recipients ||
                !Array.isArray(body.recipients) ||
                body.recipients.length === 0) {
                throw new common_1.BadRequestException('Le champ "recipients" doit contenir au moins un destinataire.');
            }
            if (!body.subject || !body.template) {
                throw new common_1.BadRequestException('Les champs "subject" et "template" sont obligatoires.');
            }
            await this.mailService.sendBulkEmails(body.recipients, body.subject, body.template, body.context);
            return {
                message: `Emails envoyés à ${body.recipients.length} destinataires`,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(`Erreur lors de l'envoi en masse : ${error instanceof Error ? error.message : 'Erreur inconnue'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.SendMailDto]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Post)('send-bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.BulkMailDto]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendBulk", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map