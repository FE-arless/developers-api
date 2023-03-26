import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Users/domain/repository/user.repository';
import { CreateApplyDTO } from '../../dto/apply/create.apply.dto';
import { DashboardApply, UserApplyStatus } from '../../entities/dashboard.apply';
import { DashboardApplyRepository } from '../../repository/apply/dashboard.apply.repository';
import { IDashboardApplyService } from './dashboard.apply.service.interface';
import { getStatus, getLevel } from '../../entities/dashboard.apply';
import { User } from 'src/Users/domain/entities/user';
import { UpdateApplyDTO } from '../../dto/apply/update.apply.dto';

@Injectable()
export class DashboardApplyService implements IDashboardApplyService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dashboardApplyRepository: DashboardApplyRepository
    ){}

    async getApplyList(email: string, startedAt: number): Promise<DashboardApply[]> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            const applies = await user.applies

            const diff: number = applies.length - startedAt;

            console.log(diff)
            
            if (applies.length == 0) {
                throw new HttpException('not found applies', HttpStatus.NOT_FOUND)   
            } else if (applies.length < 5) {
                return applies
            } else if (diff < 5) {
                return applies.slice(startedAt, startedAt + diff)
            } else {
                return applies.slice(startedAt, startedAt + 5)
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }
    }

    async createApplyInfo(email: string, applyInfo: CreateApplyDTO): Promise<DashboardApply | undefined> {
        var user = await this.userRepository.findByEmail(email)

        var apply = new DashboardApply()
        const info = {
            companyName: applyInfo.companyName,
            salary: applyInfo.salary,
            teckStack: applyInfo.teckStack,
            jobPostUrl: applyInfo.jobPostUrl,
            position: applyInfo.position,
        }
        console.log(info)
        if (user) { //exist User
            
            apply = {
                status: getStatus(applyInfo.status),
                level: getLevel(applyInfo.level),
                ...info,
                ...apply,
            }
            apply.user = { id: user.id, email: user.email } as User;

            try {
                await this.dashboardApplyRepository.save(apply)
            } catch(err) {
                console.log(err)
                throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)   
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return apply
    }

    async updateApplyInfo(email: string, applyInfo: UpdateApplyDTO): Promise<DashboardApply> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            var apply = new DashboardApply()
            
            const info = {
                salary: applyInfo.salary,
                jobPostUrl: applyInfo.jobPostUrl,
            }
            apply = {
                ...apply,
                status: getStatus(applyInfo.status),
                ...info
            }

            apply.user = { id: user.id, email: user.email } as User;

            try {
                await this.dashboardApplyRepository.save(apply)
            } catch(err) {
                console.log(err)
                throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)   
            }

        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return apply
    }

    async deleteApplyInfo(email: string, applyInfoId: number): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(email)

        if (user) {
            try {
                await this.dashboardApplyRepository.delete(applyInfoId)
            } catch(err) {
                console.log(err)
                throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)      
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return true
    }
}
