import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { IMailService } from "./mail.service.interface";
import { createTemporaryPassword, encrypt } from "src/util/auth";
import { User, UserStatus, UserType } from "src/Users/domain/entities/user";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements IMailService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async sendVerifyEmail(email: string): Promise<boolean> {
        var user = await this.userRepository.findByEmail(email)

        if (user != undefined) {
            throw new HttpException("Already SignUp User", HttpStatus.BAD_REQUEST)
        }

         var randomPassword = createTemporaryPassword()
         
         await this.userRepository.save({
            email: email,
            userStatus: UserStatus.Invited,
            password: randomPassword,
            userType: UserType.Email
        })

         //이메일 전송
        console.log('이메일 전송을 위한 셋업')
        const transporter = nodemailer.createTransport({
            host: 'developers-tool.com',
            service: 'gmail',
            auth: {
              user: 'step3429@gmail.com',
              pass: "uhlzirdtyivsgpvr",
            }
        })
        
        console.log('임시비밀번호 암호화')
        var token = encrypt(randomPassword)
        
        console.log(`${email} 주소로 ${token}과 인증 이메일 전송합니다.`)
        await transporter.sendMail({
            from: 'developers-tool.com',
            to: email,
            subject: "이메일 인증용 링크가 담긴 이메일입니다.",
            html: `
            <br>이메일 인증 버튼를 누르시면 이메일 인증이 완료됩니다.<br/>
            <form action="ec2-3-90-70-139.compute-1.amazonaws.com/signup/verify/${token}" method="GET">
              <button>이메일 인증</button>
            </form>
            `
        }).then((res) => {
            console.log(res)
        })

        console.log(`${email} 이메일로 인증 이메일을 전송완료 했습니다.`)

        return true
    }
}