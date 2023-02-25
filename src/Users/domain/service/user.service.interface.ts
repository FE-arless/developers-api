import { User } from "../entities/User";

export interface IUserService {
    
    getUserInfo(id: number): Promise<User | undefined>; 
}