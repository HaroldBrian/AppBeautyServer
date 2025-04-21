/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateServiceDto } from './dto';
import { ServiceService } from './service.service';

@ApiTags('Services Management')
@Controller('api/v1/services')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('shop/:shopId')
  findShopServices(@Param() params: { shopId: string }, @Query() query: { isVisible?: boolean; limit?: number }) {
    const { shopId } = params;
    return this.service.findShopServices({
      shopId,
      ...query
    });
  }

  @Get('category/:categoryId')
  findcategoryServices(@Param() params: { categoryId: string }, @Query() query: { isVisible?: boolean; limit?: number }) {
    const { categoryId } = params;
    return this.service.findCategoryServices({
      categoryId,
      ...query
    });
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    // The data should be send using form-data type
    createServiceDto.image = image;
    return this.service.create(createServiceDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: Prisma.ServiceUpdateInput,
  ) {
    return this.service.update(+id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
