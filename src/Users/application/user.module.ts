import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { User } from "src/Users/domain/entities/user";
import { UserRepository } from "../domain/repository/user.repository";
import { UserService } from "../domain/service/user.service";
import { UserController } from './user/user.controller';


@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      TypeOrmExModule.forCustomRepository([UserRepository])
    ],
    exports: [
      TypeOrmModule,
      TypeOrmExModule
    ],
    controllers: [UserController],
    providers: [UserService]
  })

export class UserModule {
  
}

