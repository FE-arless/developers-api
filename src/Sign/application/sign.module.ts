import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { SignController } from "./sign/sign.controller";


@Module({
    imports: [
      TypeOrmExModule.forCustomRepository([UserRepository])
      
    ],
    controllers: [SignController],
  })

export class SignModule {
  
}