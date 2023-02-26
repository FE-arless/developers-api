import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/Users/domain/dto/create.user.dto";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { ISignService } from "./sign.service.interface";


@Injectable()
export class SignService implements ISignService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async signUp(userInfo: CreateUserDTO): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(userInfo.email)

        // if (user == undefined) {
        //     if (user.userStatus != )
        //     throw new HttpException(new Error('Already SignUp User'), HttpStatus.NOT_FOUND);
        // } else {
        //     throw new HttpException(new Error('Already SignUp User'), HttpStatus.BAD_REQUEST);
        // }
        if (user != undefined) {
            throw new HttpException("Already SignUp User", HttpStatus.BAD_REQUEST);
        }

        try {
           await this.userRepository.save(userInfo)
        } catch {
            throw new HttpException(new Error('internal server error'), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return true;
    }

    async verifyEmail(email: string): Promise<string> {
        return "";
    }
}