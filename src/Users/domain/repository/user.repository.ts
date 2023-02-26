import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import { IUserRepository } from "./user.repository.interface";

export interface UserFindOneOptions {
    id?: number
    email?: string
    nickname?: string
}

@CustomRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
    


    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email }});
    }

}