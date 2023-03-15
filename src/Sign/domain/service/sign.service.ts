import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/Users/domain/dto/create.user.dto";
import { User, UserStatus, UserType } from "src/Users/domain/entities/user";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { ISignService } from "./sign.service.interface";
import { decrypt } from "src/util/auth";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignService implements ISignService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async signUp(userInfo: CreateUserDTO): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(userInfo.email)

        if (user != undefined) {
            if (user.userStatus != UserStatus.Invited) {
                throw new HttpException("Already SignUp User", HttpStatus.BAD_REQUEST);    
            }

            //임시 비밀번호가 있는 유저 -> 이메일 인증 회원
            if (userInfo.tempPassword != null && user.userStatus == UserStatus.Invited) {
                if (user.password != userInfo.tempPassword) {
                    throw new HttpException("Not Verified User", HttpStatus.UNAUTHORIZED)
                } else { //인증된 회원은 그대로 업데이트되면서 가입 성공
                    userInfo.password = await bcrypt.hash(userInfo.password, 10)

                    console.log(userInfo.password)

                    try {
                        await this.userRepository.save({
                            ...user,
                            ...userInfo,
                            userStatus: UserStatus.Archived,
                            userType: UserType.Email
                        })
                    } catch {
                        throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                    console.log('이메일 유저 회원가입 성공')
                    return true;
                }
            }
        } // 그 외 케이스는 구글 가입이므로 패스
        
        try {
           await this.userRepository.save({
             ...userInfo,
             userStatus: UserStatus.Archived,
             userType: UserType.Google
           })
        } catch {
            throw new HttpException(new Error('internal server error'), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        console.log('구글 유저 회원가입 성공')
        return true;
    }
}