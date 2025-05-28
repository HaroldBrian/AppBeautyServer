/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      secure: false,
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.pass'),
      },
    });

    this.registerPartials();
  }

  private registerPartials(): void {
    const partialsDir = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'mail',
      'templates',
      'partials',
    );

    if (!fs.existsSync(partialsDir)) {
      this.logger.warn(
        `Le répertoire des partials est introuvable : ${partialsDir}`,
      );
      return;
    }

    const filenames = fs.readdirSync(partialsDir);
    filenames.forEach((filename) => {
      const partialName = path.parse(filename).name;
      const filePath = path.join(partialsDir, filename);
      const partialContent = fs.readFileSync(filePath, 'utf-8');
      hbs.registerPartial(partialName, partialContent);
    });
  }

  private async parseTemplate(
    templateName: string,
    context: any,
  ): Promise<string> {
    const baseDir = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'mail',
      'templates',
    );

    const filePath = path.join(baseDir, `${templateName}.hbs`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Template file not found: ${filePath}`);
    }

    const source = fs.readFileSync(filePath, 'utf-8');
    const compiled = hbs.compile(source);
    return compiled(context);
  }

  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    context: any = {},
    attachments: any[] = [],
  ): Promise<void> {
    try {
      const html = await this.parseTemplate(templateName, context);

      const mailOptions = {
        from: this.configService.get<string>('mail.from'),
        to,
        subject,
        html,
        context: {
          ...context,
          year: new Date().getFullYear(),
        },
        attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${to}: ${info.messageId}`);
      this.logger.debug(`Sending email to ${to} with template ${templateName}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw new InternalServerErrorException('Unable to send email');
    }
  }

  async sendBulkEmails(
    recipients: string[],
    subject: string,
    templateName: string,
    globalContext: any = {},
  ): Promise<void> {
    for (const to of recipients) {
      await this.sendMail(to, subject, templateName, globalContext);
    }
  }
}
