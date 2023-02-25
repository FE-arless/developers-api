import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/domain/entities/User';
import { databaseProviders } from './database.providers';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('database_config'),
        entities: [
          User
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}