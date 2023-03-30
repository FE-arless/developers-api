import { CreateUserDTO } from "src/Users/domain/dto/create.user.dto";
import { User } from "src/Users/domain/entities/user";
import { ResetUserPasswordDTO } from "../dto/reset.user.password.dto";


export interface ISignService {
    
    //회원가입
    signUp(user: CreateUserDTO): Promise<Boolean | undefined>;

    //패스워드 재설정
    resetPassword(user: ResetUserPasswordDTO): Promise<User | undefined>;
}