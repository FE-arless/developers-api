import { Module } from '@nestjs/common';
import { DatabaseModule } from './Common/infrastructure/database.module';
import { SignModule } from './Sign/application/sign.module';
import { UserModule } from './Users/application/user.module';


@Module({
  imports: [
    DatabaseModule,
    SignModule,
    UserModule
  ],
})

export class AppModule {
  
}
