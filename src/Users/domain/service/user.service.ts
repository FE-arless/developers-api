import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../domain/repository/user.repository";
import { IUserService } from "./user.service.interface";
import { User } from "../entities/User";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async getUserInfo(id: number): Promise<User> {
        return await this.userRepository.findById(id)
    }
}
