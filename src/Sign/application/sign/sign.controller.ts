import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MailService } from 'src/Sign/domain/service/mail.service';
import { SignService } from 'src/Sign/domain/service/sign.service';
import { CreateUserDTO } from 'src/Users/domain/dto/create.user.dto';

@Controller('sign')
export class SignController {
    constructor(
        private readonly signService: SignService,
        private readonly mailService: MailService
    ) {}

    @Post('up')
    async signUp(@Body() user: CreateUserDTO): Promise<Boolean | undefined> {
        return this.signService.signUp(user)
    }

    @Get('verify/email')
    async verifyEmail(@Query('email') email: string): Promise<boolean | undefined> {
        console.log(`verify email ${email}`)
        return this.mailService.sendVerifyEmail(email)
    }
}
