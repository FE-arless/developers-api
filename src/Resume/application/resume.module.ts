import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Common/infrastructure/auth/auth.module';
import { TypeOrmExModule } from 'src/util/typeorm-ex.module';
import { Resume, ResumeList } from '../domain/entities/resume';
import { ResumeInfoRepository } from '../domain/repository/resume.info.repository';
import { ResumeRepository } from '../domain/repository/resume.repository';
import { ResumeService } from '../domain/service/resume.service';
import { ResumeController } from './resume/resume.controller';

@Module({

    imports: [
        TypeOrmModule.forFeature([ResumeList, Resume]),
        TypeOrmExModule.forCustomRepository([ResumeRepository, ResumeInfoRepository]),
        AuthModule
    ],
    providers: [ResumeService],
    controllers: [ResumeController],
    
})

export class ResumeModule {}
