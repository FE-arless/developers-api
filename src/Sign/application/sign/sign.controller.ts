import { Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/Users/domain/dto/create.user.dto';
import { User } from 'src/Users/domain/entities/User';

@Controller('sign')
export class SignController {

    @Post('up')
    async signUp(user: CreateUserDTO): Promise<User | undefined> {
        return undefined
    }

    @Post('verify/email')
    async verifyEmail(email: string): Promise<string | undefined> {
        return ""
    }
}
