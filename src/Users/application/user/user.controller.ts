import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserInfoDTO } from '../../domain/dto/update.user.dto';
import { User } from 'src/Users/domain/entities/user';
import { UserService } from 'src/Users/domain/service/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('access'))
    @Get()
    async getUserInfo(@Param('email') email: string): Promise<User | undefined> {
        return this.userService.getUserInfo(email)
    }

    @UseGuards(AuthGuard('access'))
    @Post('update')
    async updateUserInfo(@Param('email') email: string, @Body() userInfo: UpdateUserInfoDTO): Promise<User | undefined> {
        return this.userService.updateUserInfo(email, userInfo)
    }

    @UseGuards(AuthGuard('access'))
    @Post('delete')
    async deleteUserInfo(@Param('email') email: string): Promise<Boolean | undefined> {
        return this.userService.deleteUserInfo(email)
    }
}
