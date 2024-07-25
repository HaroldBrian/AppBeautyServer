export class CreateShopDto {
    code: string;
    name: string;
    description: string;
    location: string;
    phoneNumber: string;
    logo: string;
    website?: string;
    socialNetworks: string[];
    images: string[];
    status: string;
    serviceId?: number;
  }