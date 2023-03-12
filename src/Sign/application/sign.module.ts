import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { SignController } from "./sign/sign.controller";
import { User } from "src/Users/domain/entities/user";
import { SignService } from "../domain/service/sign.service";
import { MailService } from "../domain/service/mail.service";

@Module({
    imports: [
      //DatabaseModule,
      TypeOrmModule.forFeature([User]),
      TypeOrmExModule.forCustomRepository([UserRepository]),
    ],
    exports: [TypeOrmModule, TypeOrmExModule],
    controllers: [SignController],
    providers: [SignService, MailService]
  })

export class SignModule {
  
}