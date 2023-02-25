import { Injectable } from "@nestjs/common";
import { CustomRepository } from "src/util/custom.repository";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from "./user.repository.interface";

@CustomRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
    
    
    async findById(id: number): Promise<User> {
        return this.findById(id)
    }
}