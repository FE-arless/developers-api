import { Module } from '@nestjs/common';
import { DatabaseModule } from './Common/infrastructure/database.module';
import { DashboardModule } from './Dashboard/application/dashboard.module';
import { ResumeModule } from './Resume/application/resume.module';
import { SignModule } from './Sign/application/sign.module';
import { UserModule } from './Users/application/user.module';


@Module({
  imports: [
    DatabaseModule,
    SignModule,
    UserModule,
    ResumeModule,
    DashboardModule,
  ],
})

export class AppModule {
  
}
