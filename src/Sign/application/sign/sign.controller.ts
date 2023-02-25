import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SignService } from 'src/Sign/domain/service/sign.service';
import { CreateUserDTO } from 'src/Users/domain/dto/create.user.dto';
import { User } from 'src/Users/domain/entities/User';

@Controller('sign')
export class SignController {
    constructor(
        private readonly signService: SignService
    ) {}

    @Post('up')
    async signUp(@Body() user: CreateUserDTO): Promise<Boolean | undefined> {
        return this.signService.signUp(user)
    }

    @Post('verify/email')
    async verifyEmail(@Param() email: string): Promise<string | undefined> {
        return ""
    }
}
