import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { IAuthService } from "./auth.service.interface";
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from "src/Users/domain/entities/user";
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from "src/Users/domain/dto/login.user.dto";
import { UserModel } from "src/Users/domain/model/user.model";

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}


    //비밀번호 기반 인증
    async authenticationUser(user: User, password: string): Promise<boolean | undefined> {
        if(!user.password && user.userType == UserType.Google) { //google
            return true
        } else { //email
            console.log('패스워드 검증')
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                return true
            } else {
                return false
            }
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email)
        if (user != undefined) {
            const isAuthentication = await this.authenticationUser(user, password)
            console.log(isAuthentication)
            //인증된 유저가 맞다면
            if (isAuthentication) {
                return user
            } else {
                return null
            }
        } else { //유저가 존재하지 않으면 
            return null
        }
    }

    //유저가 인증된 이후 로그인 절차
    async login(user: User): Promise<UserModel> {
        const tempUser = await this.userRepository.findByEmail(user.email)

        const payload = { email: user.email };
        if (tempUser != undefined) {
            return await this.getAccessToken(user)
        } else {
            throw new HttpException("not found User", HttpStatus.NOT_FOUND)
        }
    }

    async getAccessToken(user: User): Promise<UserModel> {
        const payload = { username: user.email };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '2h',
            secret: "This is the private key used by developers.",
          });
        
          const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7h',
            secret: "This is the private key used by developers.",
          });
        
        const userModel = new UserModel()
        userModel.email = user.email
        userModel.accessToken = accessToken
        userModel.refreshToken = refreshToken
        return userModel
    }
}
