import { LoginUserDTO } from "src/Users/domain/dto/login.user.dto"
import { User } from "src/Users/domain/entities/user"
import { UserModel } from "src/Users/domain/model/user.model"


export interface IAuthService {


    //유저 유효성 검증
    validateUser(email: string, password: string): Promise<any>

    //유저 비밀번호 기반 검증
    authenticationUser(user: User, password: string): Promise<boolean | undefined>

    //login - Jwt
    login(user: User): Promise<UserModel | undefined>

    //get access token
    getAccessToken(user: User): Promise<UserModel | undefined>
}