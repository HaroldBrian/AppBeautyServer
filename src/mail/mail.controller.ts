/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto, BulkMailDto } from './dto/mail.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('mail')
@ApiBearerAuth()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() body: SendMailDto) {
    try {
      if (!body.to || !body.subject || !body.template) {
        throw new BadRequestException('Fields required.');
      }

      await this.mailService.sendMail(
        body.to,
        body.subject,
        body.template,
        body.context,
        body.attachments,
      );
      return { message: `Email envoyé à ${body.to}` };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur inconnue';
      throw new HttpException(
        `Erreur lors de l'envoi de l'email : ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('send-bulk')
  async sendBulk(@Body() body: BulkMailDto) {
    try {
      if (
        !body.recipients ||
        !Array.isArray(body.recipients) ||
        body.recipients.length === 0
      ) {
        throw new BadRequestException(
          'Le champ "recipients" doit contenir au moins un destinataire.',
        );
      }
      if (!body.subject || !body.template) {
        throw new BadRequestException(
          'Les champs "subject" et "template" sont obligatoires.',
        );
      }

      await this.mailService.sendBulkEmails(
        body.recipients,
        body.subject,
        body.template,
        body.context,
      );
      return {
        message: `Emails envoyés à ${body.recipients.length} destinataires`,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        `Erreur lors de l'envoi en masse : ${
          error instanceof Error ? error.message : 'Erreur inconnue'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
