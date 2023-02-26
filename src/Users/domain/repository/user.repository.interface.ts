import { User } from "../entities/user";



export interface IUserRepository {

    // 유저 이메일 기반 유저 정보
    findByEmail(email: string): Promise<User | undefined>;

    //findOne({ id, email, nickname }: UserFindOneOptions = {});
}