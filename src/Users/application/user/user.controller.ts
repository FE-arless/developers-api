import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserInfoDTO } from '../../domain/dto/update.user.dto';
import { User } from 'src/Users/domain/entities/user';
import { UserService } from 'src/Users/domain/service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiResponse({
        status: 200,
        description: '특정 유저정보',
        type: User,
    })
    @UseGuards(AuthGuard('access'))
    @Get()
    async getUserInfo(@Param('email') email: string): Promise<User | undefined> {
        return this.userService.getUserInfo(email)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저정보를 수정하고 난 후 데이터',
        type: User,
    })
    @UseGuards(AuthGuard('access'))
    @Post('update')
    async updateUserInfo(@Param('email') email: string, @Body() userInfo: UpdateUserInfoDTO): Promise<User | undefined> {
        return this.userService.updateUserInfo(email, userInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저 삭제여부',
        type: Boolean,
    })
    @UseGuards(AuthGuard('access'))
    @Post('delete')
    async deleteUserInfo(@Param('email') email: string): Promise<Boolean | undefined> {
        return this.userService.deleteUserInfo(email)
    }
}
