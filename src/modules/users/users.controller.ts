import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: { username: string, password: string }) {
    return this.usersService.createUser(createUserDto.username, createUserDto.password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'Super admin')
  @Get()
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }
}
