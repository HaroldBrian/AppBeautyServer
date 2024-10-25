import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShopDto {
  code: string;
  name: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  location?: string;
  phoneNumber: string;
  @IsOptional()
  logo?: string;
  @IsOptional()
  website?: string;
  socialNetworks: string[];
  @IsOptional()
  images?: string[];
  @IsOptional()
  status?: string;
  @IsNotEmpty()
  userId: number;
}
