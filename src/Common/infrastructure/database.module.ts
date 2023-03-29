import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardApply } from 'src/Dashboard/domain/entities/dashboard.apply';
import { DashboardNotes } from 'src/Dashboard/domain/entities/dashboard.notes';
import { DashboardSchedule } from 'src/Dashboard/domain/entities/dashboard.schedule';
import { Resume, ResumeList } from 'src/Resume/domain/entities/resume';
import { User } from '../../Users/domain/entities/user';


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
          User, 
          ResumeList,
          Resume,
          DashboardApply,
          DashboardSchedule,
          DashboardNotes
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}