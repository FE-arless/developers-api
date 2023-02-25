import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "src/Users/domain/dto/create.user.dto";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { ISignService } from "./sign.service.interface";


@Injectable()
export class SignService implements ISignService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async signUp(user: CreateUserDTO): Promise<Boolean> {
        return false;
    }

    async verifyEmail(email: string): Promise<string> {
        return "";
    }
}