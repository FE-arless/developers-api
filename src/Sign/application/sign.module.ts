import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { SignController } from "./sign/sign.controller";
import { User } from "src/Users/domain/entities/User";
import { SignService } from "../domain/service/sign.service";
import { DatabaseModule } from "src/Common/infrastructure/database/database.module";

@Module({
    imports: [
      //DatabaseModule,
      TypeOrmModule.forFeature([User]),
      TypeOrmExModule.forCustomRepository([UserRepository]),
    ],
    exports: [TypeOrmModule, TypeOrmExModule],
    controllers: [SignController],
    providers: [SignService]
  })

export class SignModule {
  
}