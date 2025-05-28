/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttachmentDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  path: string;
}

export class SendMailDto {
  @IsEmail()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  template: string;

  @IsOptional()
  context?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}

export class BulkMailDto {
  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  template: string;

  @IsOptional()
  context?: Record<string, any>;
}
