import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RegisterDto, UpdateUserDto } from './dto/user.dto';
import { Roles } from 'src/common/guards/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AppUserRoles } from 'src/database/interfaces/role.interface';
import { Public } from 'src/common/guards/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  // Route to get all users (admin only)
  @Get()
  @Roles([AppUserRoles.ADMIN])
  findAll(@Req() req: Request) {
    return this.usersService.findAll();
  }

  // Route to get current user profile
  @Get('me')
  @Roles([AppUserRoles.ADMIN, AppUserRoles.COACH, AppUserRoles.STAFF, AppUserRoles.USER])
  findMe(@Req() req: Request) {
    return req['user'];
  }

  // Route to get a single user by ID
  @Get(':id')
  @Roles([AppUserRoles.ADMIN, AppUserRoles.COACH, AppUserRoles.STAFF, AppUserRoles.USER])
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Route to update a user
  @Patch(':id')
  @Roles([AppUserRoles.ADMIN, AppUserRoles.COACH, AppUserRoles.STAFF, AppUserRoles.USER])
  update(@Param('id') id: string, @Body() updateUserData: UpdateUserDto) {
    return this.usersService.update(+id, updateUserData);
  }

  // Route to delete a user
  @Delete(':id')
  @Roles([AppUserRoles.ADMIN])
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
