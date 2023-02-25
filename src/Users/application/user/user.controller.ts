import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UpdateUserInfoDTO } from '../../domain/dto/update.user.dto';
import { User } from 'src/Users/domain/entities/User';
import { UserService } from 'src/Users/domain/service/user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getUserInfo(@Param('email') email: string): Promise<User | undefined> {
        return this.userService.getUserInfo(email)
    }

    @Post('update')
    async updateUserInfo(@Param('email') email: string, @Body() userInfo: UpdateUserInfoDTO): Promise<User | undefined> {
        return this.userService.updateUserInfo(email, userInfo)
    }

    @Post('delete')
    async deleteUserInfo(@Param('email') email: string): Promise<Boolean | undefined> {
        return this.userService.deleteUserInfo(email)
    }
}
