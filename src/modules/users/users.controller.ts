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
import { UpdateUserDto } from './dto/user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Route to get all users (admin only)
    @Get()
    findAll(@Req() req: Request) {
        // req['user'] is injected by the AuthGuard
        // You can add role checking here if needed
        return this.usersService.findAll();
    }

    // Route to get current user profile
    @Get('me')
    findMe(@Req() req: Request) {
        return req['user'];
    }

    // Route to get a single user by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // Route to update a user
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserData: UpdateUserDto) {
        return this.usersService.update(+id, updateUserData);
    }

    // Route to delete a user
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
