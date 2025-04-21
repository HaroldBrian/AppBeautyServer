import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('api/v1/rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ratingService.findOne(id);
  }

  @Get('user/:userId')
    findUserRatings(@Param() params: { userId: string }, @Query() query: { status?: string; limit?: number }) {
      const { userId } = params;
      return this.ratingService.findUserRatings({
        userId,
        ...query
      });
    }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRatingDto: CreateRatingDto) {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ratingService.remove(id);
  }
}
