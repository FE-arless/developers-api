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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetUserPasswordDTO } from 'src/Sign/domain/dto/reset.user.password.dto';

@ApiTags('Sign')
@Controller('/api/v1/sign')
export class SignController {
    constructor(
        private readonly signService: SignService,
        private readonly mailService: MailService,
        private readonly authService: AuthService
    ) {}

    @ApiResponse({
        status: 200,
        description: '가입을 위한 인증 이메일 전송 여부',
        type: Boolean,
    })
    @Get('verify/email')
    async verifyEmail(@Query('email') email: string): Promise<boolean | undefined> {
        console.log(`verify email ${email}`)
        return this.mailService.sendVerifyEmail(email)
    }

    @ApiResponse({
        status: 200,
        description: '패스워드 재설정 이메일 전송 여부',
        type: Boolean,
    })
    @Get('verify/email/reset_password')
    async sendResetPasswordEmail(@Query('email') email: string): Promise<boolean | undefined> {
        return this.mailService.sendPasswordResetEmail(email)
    }

    @ApiResponse({
        status: 200,
        description: '토큰을 갱신하고 난 후 데이터',
        type: UserModel,
    })
    @UseGuards(AuthGuard('refresh'))
    @Get('auth/refresh')
    async refreshToken(@Req() req): Promise<UserModel> {
        return this.authService.getAccessToken(req.user)
    }

    @ApiResponse({
        status: 200,
        description: '회원가입 여부',
        type: Boolean,
    })
    @Post('up')
    async signUp(@Body() user: CreateUserDTO): Promise<Boolean | undefined> {
        return this.signService.signUp(user)
    }

    @ApiResponse({
        status: 200,
        description: '패스워드 재설정을 한 후 유저데이터',
        type: User,
    })
    @Post('auth/reset_password')
    async resetPassword(@Body() resetUser: ResetUserPasswordDTO): Promise<User | undefined> {
        return this.signService.resetPassword(resetUser)
    }

    @ApiResponse({
        status: 200,
        description: '정상적인 로그인 이후 데이터',
        type: UserModel,
    })
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req, @Res({ passthrough: true }) res): Promise<UserModel> {

        const user = await this.authService.login(req.user)
        
        // res.cookie('Authentication', user.accessToken, ...accessOption);
        // res.cookie('Refresh', user.refreshToken, refreshOption);

        return user
    }


}
