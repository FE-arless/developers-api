import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/Common/infrastructure/auth/local-auth.guard';
import { AuthService } from 'src/Sign/domain/service/auth.service';
import { MailService } from 'src/Sign/domain/service/mail.service';
import { SignService } from 'src/Sign/domain/service/sign.service';
import { CreateUserDTO } from 'src/Users/domain/dto/create.user.dto';
import { LoginUserDTO } from 'src/Users/domain/dto/login.user.dto';
import { User } from 'src/Users/domain/entities/user';
import { UserModel } from 'src/Users/domain/model/user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResetUserPasswordDTO } from 'src/Sign/domain/dto/reset.user.password.dto';

@ApiTags('Sign')
@Controller('sign')
export class SignController {
    constructor(
        private readonly signService: SignService,
        private readonly mailService: MailService,
        private readonly authService: AuthService
    ) {}

    @Get('verify/email')
    async verifyEmail(@Query('email') email: string): Promise<boolean | undefined> {
        console.log(`verify email ${email}`)
        return this.mailService.sendVerifyEmail(email)
    }

    @Get('verify/email/reset_password')
    async sendResetPasswordEmail(@Query('email') email: string): Promise<boolean | undefined> {
        return this.mailService.sendPasswordResetEmail(email)
    }

    @Post('up')
    async signUp(@Body() user: CreateUserDTO): Promise<Boolean | undefined> {
        return this.signService.signUp(user)
    }

    @Post('auth/reset_password')
    async resetPassword(@Body() resetUser: ResetUserPasswordDTO): Promise<User | undefined> {
        return this.signService.resetPassword(resetUser)
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req, @Res({ passthrough: true }) res): Promise<UserModel> {

        const user = await this.authService.login(req.user)
        
        // res.cookie('Authentication', user.accessToken, ...accessOption);
        // res.cookie('Refresh', user.refreshToken, refreshOption);

        return user
    }

    @UseGuards(AuthGuard('refresh'))
    @Get('auth/refresh')
    async refreshToken(@Req() req): Promise<UserModel> {
        return this.authService.getAccessToken(req.user)
    }
}
