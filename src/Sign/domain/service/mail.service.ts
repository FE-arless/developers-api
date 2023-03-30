import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { IMailService } from "./mail.service.interface";
import { createTemporaryPassword, encrypt } from "src/util/auth";
import { User, UserStatus, UserType } from "src/Users/domain/entities/user";
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { getSignUpTemplate } from "src/Common/infrastructure/auth/signUp";
import { getPasswordResetTemplate } from "src/Common/infrastructure/auth/password.reset";

const transporter = nodemailer.createTransport({
    host: 'developers-tool.com',
    service: 'gmail',
    auth: {
      user: 'developers.tool.noreply@gmail.com',
      pass: "caawlcdjspqgrafl",
    }
})

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

        
        console.log('임시비밀번호 암호화')
        var token = encrypt(randomPassword)
        
        console.log(`${email} 주소로 ${token}과 인증 이메일 전송합니다.`)
        await transporter.sendMail({
            from: 'developers-tool.com',
            to: email,
            subject: "이메일 인증용 링크가 담긴 이메일입니다.",
            html: getSignUpTemplate(email, token)
        }).then((res) => {
            console.log(res)
        })

        console.log(`${email} 이메일로 인증 이메일을 전송완료 했습니다.`)

        return true
    }

    async sendPasswordResetEmail(email: string): Promise<boolean> {
        var user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new HttpException("Not found user", HttpStatus.NOT_FOUND)
        }

        var randomPassword = createTemporaryPassword()

        user = {
            ...user,
            password: randomPassword,
        }

        try { 
            await this.userRepository.save(user)
        } catch(err) {
            console.log(err)
            throw new HttpException("Internal server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        var encryptPassword = encrypt(randomPassword)

        console.log(`${email} 주소로 ${encryptPassword}과 패스워드 재설정 이메일 전송합니다.`)
        await transporter.sendMail({
            from: 'developers-tool.com',
            to: email,
            subject: "패스워드 재설정 링크가 담긴 이메일입니다.",
            html: getPasswordResetTemplate(email, encryptPassword)
        }).then((res) => {
            console.log(res)
        })

        console.log(`${email} 이메일로 패스워드 재설정 이메일을 전송완료 했습니다.`)

        return true
    }
}