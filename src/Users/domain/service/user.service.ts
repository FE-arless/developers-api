import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repository/user.repository";
import { IUserService } from "./user.service.interface";
import { User } from "../entities/user";
import { UpdateUserInfoDTO } from "../dto/update.user.dto";

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async getUserInfo(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email)

        if (user == undefined) {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async updateUserInfo(email: string, userInfo: UpdateUserInfoDTO): Promise<User> {
        var user = await this.userRepository.findByEmail(email)

        if (user == undefined) {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }

        return this.userRepository.save({
            ...user,
            ...userInfo
        })
    }

    async deleteUserInfo(email: string): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(email)

        if (user == undefined) {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)
        }

        console.log(user)

        try {
            await this.userRepository.delete(user.id)
        } catch {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return true
    }
}
