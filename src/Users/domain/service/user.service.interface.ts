import { UpdateUserInfoDTO } from "../dto/update.user.dto";
import { User } from "../entities/user";

export interface IUserService {
    
    getUserInfo(email: string): Promise<User | undefined>; 

    updateUserInfo(email: string, userInfo: UpdateUserInfoDTO): Promise<User | undefined>;

    deleteUserInfo(email: string): Promise<Boolean | undefined>;
}