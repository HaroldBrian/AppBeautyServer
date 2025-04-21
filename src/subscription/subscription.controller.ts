import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription Service')
@Controller('api/v1/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return await this.subscriptionService.createSubscription(
      createSubscriptionDto,
    );
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(+id);
  }

@Get('user/:userId')
  findUserSubscriptions(@Param() params: { userId: string }, @Query() query: { status?: string; limit?: number }) {
    const { userId } = params;
    return this.subscriptionService.findUserSubscriptions({
      userId,
      ...query
    });
  }

  @Patch(':id')
  async updateSubscription(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionService.updateSubscription(
      id,
      updateSubscriptionDto,
    );
  }

  @Delete(':id')
  async cancelSubscription(@Param('id', ParseIntPipe) id: number) {
    return await this.subscriptionService.cancelSubscription(id);
  }
}
