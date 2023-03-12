
export interface IMailService {

    //인증 이메일 전송
    sendVerifyEmail(email: string): Promise<boolean>
}