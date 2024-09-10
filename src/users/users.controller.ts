/* eslint-disable prettier/prettier */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
  HttpException
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdatePasswordDto, UpdateProfileDto } from './users.dto';
import { UsersService } from './users.service';
@ApiTags("User management Api's")
@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  public async profile(@Req() req) {
    return await this.usersService.profile(req.id);
  }

  @Get('all')
  public async users(){
    return await this.usersService.getUsers();
  }

  @Get('admin')
  public async admin(){
    return await this.usersService.getAdmins();
  }

  @Get('providers')
  public async providers(){
    return await this.usersService.getProviders();
  }
  @Get('clients')
  public async clients(){
    return await this.usersService.getClients();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }

  @Put('profile/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    try {
      const updatedUser = await this.usersService.updateProfile(Number(id), updateProfileDto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
