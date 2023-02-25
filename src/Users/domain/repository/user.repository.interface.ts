import { User } from "../entities/User";



export interface IUserRepository {

    // 유저아이디 기반 유저 정보
    findById(id: number): Promise<User | undefined>;
}