import { CreateUserDTO } from "src/Users/domain/dto/create.user.dto";


export interface ISignService {
    
    //회원가입
    signUp(user: CreateUserDTO): Promise<Boolean | undefined>;


}