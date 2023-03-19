import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/Sign/domain/service/auth.service';
import { UserModule } from 'src/Users/application/user.module';
import { User } from 'src/Users/domain/entities/user';
import { UserRepository } from 'src/Users/domain/repository/user.repository';
import { TypeOrmExModule } from 'src/util/typeorm-ex.module';
import { JwtAccessStrategy } from './jwt.access.strategy';
import { JwtRefreshStrategy } from './jwt.refresh.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({}),
        TypeOrmModule.forFeature([User]),
        TypeOrmExModule.forCustomRepository([UserRepository]),
        UserModule
    ],
    providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
    exports: [AuthService, JwtModule],
  })
  
  export class AuthModule {}