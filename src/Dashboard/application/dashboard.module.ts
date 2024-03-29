import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Common/infrastructure/auth/auth.module';
import { TypeOrmExModule } from 'src/util/typeorm-ex.module';
import { DashboardApply } from '../domain/entities/dashboard.apply';
import { DashboardSchedule } from '../domain/entities/dashboard.schedule';
import { DashboardNotes } from '../domain/entities/dashboard.notes';
import { DashboardApplyRepository } from '../domain/repository/apply/dashboard.apply.repository';
import { DashboardScheduleRepository } from '../domain/repository/calendar/dashboard.schedule.repository';
import { DashboardNotesRepository } from '../domain/repository/notes/dashboard.notes.repository';
import { DashboardApplyService } from '../domain/service/apply/dashboard.apply.service';
import { DashboardScheduleService } from '../domain/service/calendar/dashboard.schedule.service';
import { DashboardNotesService } from '../domain/service/notes/dashboard.notes.service';
import { DashboardApplyController } from './apply/dashboard.apply/dashboard.apply.controller';
import { DashboardScheduleController } from './schedule/dashboard.schedule/dashboard.schedule.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardNotesController } from './notes/dashboard.notes/dashboard.notes.controller';
import { User } from 'src/Users/domain/entities/user';
import { UserRepository } from 'src/Users/domain/repository/user.repository';

@Module({
  imports: 
  [
    TypeOrmModule.forFeature([DashboardApply, DashboardSchedule, DashboardNotes, User]),
    TypeOrmExModule.forCustomRepository([DashboardApplyRepository, DashboardScheduleRepository, DashboardNotesRepository, UserRepository]),
    AuthModule
  ],
  controllers: 
  [
    DashboardController,
    DashboardApplyController,
    DashboardScheduleController,
    DashboardNotesController
  ],
  providers: 
  [
    DashboardNotesService,
    DashboardApplyService,
    DashboardScheduleService
  ]
})
export class DashboardModule {}
