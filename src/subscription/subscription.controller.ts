import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
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
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.subscriptionService.createSubscription(
      id,
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

  @Get(':id')
  getUserSubscriptions(@Param('id') id: string) {
    return this.subscriptionService.getSubscriptionsByUser(+id);
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
