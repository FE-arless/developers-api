import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/Users/domain/repository/user.repository";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { SignController } from "./sign/sign.controller";
import { User } from "src/Users/domain/entities/user";
import { SignService } from "../domain/service/sign.service";
import { MailService } from "../domain/service/mail.service";
import { AuthModule } from "src/Common/infrastructure/auth/auth.module";
import { AuthService } from "../domain/service/auth.service";
import { ResumeRepository } from "src/Resume/domain/repository/resume.repository";
import { Resume, ResumeList } from "src/Resume/domain/entities/resume";

@Module({
    imports: [
      //DatabaseModule,
      TypeOrmModule.forFeature([User, ResumeList, Resume]),
      TypeOrmExModule.forCustomRepository([UserRepository, ResumeRepository]),
      AuthModule
    ],
    exports: [TypeOrmModule, TypeOrmExModule],
    controllers: [SignController],
    providers: [SignService, MailService]
  })

export class SignModule {
  
}