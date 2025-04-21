import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';

@Controller('api/v1/meet')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Post()
  create(@Body() createMeetDto: CreateMeetDto) {
    return this.meetService.create(createMeetDto);
  }

  @Get()
  findAll() {
    return this.meetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetService.findOne(+id);
  }

  @Get('user/:userId')
    findUserMeets(@Param() params: { userId: string }, @Query() query: { status?: string; limit?: number }) {
      const { userId } = params;
      return this.meetService.findUserMeets({
        userId,
        ...query
      });
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetDto: UpdateMeetDto) {
    return this.meetService.update(+id, updateMeetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetService.remove(+id);
  }
}
