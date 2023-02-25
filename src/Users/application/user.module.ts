import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/util/typeorm-ex.module";
import { UserRepository } from "../domain/repository/user.repository";
import { UserController } from './user/user.controller';


@Module({
    imports: [
      TypeOrmExModule.forCustomRepository([UserRepository])
    ],
    controllers: [UserController],
  })

export class UserModule {
  
}

