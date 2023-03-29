import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/Users/domain/entities/user';
import { UserRepository } from 'src/Users/domain/repository/user.repository';
import { CreateScheduleDTO } from '../../dto/schedule/create.schedule.dto';
import { UpdateScheduleDTO } from '../../dto/schedule/update.schedule.dto';
import { DashboardSchedule, getMatchesSchedule, getScheduleType, unixToTimestamp } from '../../entities/dashboard.schedule';
import { DashboardScheduleRepository } from '../../repository/calendar/dashboard.schedule.repository';
import { IDashboardScheduleService } from './dashboard.schedule.service.interface';

@Injectable()
export class DashboardScheduleService implements IDashboardScheduleService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dashboardScheduleRepository: DashboardScheduleRepository
    ){}

    async getSchedule(email: string): Promise<DashboardSchedule[]> {
        var user = await this.userRepository.findByEmail(email)

        let matchSchedules = null;

        if (user) {
            const schedules = await user.schedules;

            if (schedules.length != 0) {
                matchSchedules = getMatchesSchedule(schedules)
            } else {
                throw new HttpException('not found applies', HttpStatus.FORBIDDEN)   
            }

        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return matchSchedules
    }

    async createSchedule(email: string, scheduleInfo: CreateScheduleDTO): Promise<DashboardSchedule> {
        var user = await this.userRepository.findByEmail(email)


        var schedule = new DashboardSchedule()

        const info = {
            title: scheduleInfo.title,
            description: scheduleInfo.description
        }

        if (user) { //exist User
            schedule = {
                ...info,
                scheduleType: getScheduleType(scheduleInfo.scheduleType),
                scheduleDate: unixToTimestamp(scheduleInfo.scheduleDate),
                ...schedule
            }

            schedule.user = { id: user.id, email: user.email } as User;

            try {
                await this.dashboardScheduleRepository.save(schedule)
            } catch(err) {
                console.log(err)
                throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)   
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return schedule
    }
    
    async updateSchedule(email: string, scheduleInfo: UpdateScheduleDTO): Promise<DashboardSchedule> {
        var user = await this.userRepository.findByEmail(email)

        let matchSchedule: DashboardSchedule = null;
        
        if (user) {
            const schedules = user.schedules;

            if (schedules) {
                (await schedules).forEach(obj => {
                    if (obj.id == scheduleInfo.scheduleId) {
                        matchSchedule = obj
                    } else {
                        return
                    }
                })

                if (matchSchedule) {
                    console.log(matchSchedule)

                    const info = {
                        title: scheduleInfo.title,
                        description: scheduleInfo.description,
                    }

                    matchSchedule = {
                        ...matchSchedule,
                        scheduleType: getScheduleType(scheduleInfo.scheduleType),
                        scheduleDate: unixToTimestamp(scheduleInfo.scheduleDate),
                        ...info,
                    }

                    matchSchedule.user = { id: user.id, email: user.email } as User;
                    
                    try {
                        await this.dashboardScheduleRepository.save(matchSchedule)
                    } catch(err) {
                        console.log(err)
                        throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)   
                    }
                } else {
                    throw new HttpException('not found schedule', HttpStatus.BAD_REQUEST)
                }
                
            } else {
                throw new HttpException('not found applies', HttpStatus.FORBIDDEN)   
            }

        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }

        return matchSchedule
    }

    async deleteSchedule(email: string, scheduleId: number): Promise<Boolean> {
        var user = await this.userRepository.findByEmail(email)

        let matchSchedule: DashboardSchedule = null;

        let schedule = new DashboardSchedule()

        if (user) {
            const schedules = user.schedules;

            if (!schedules) {
                throw new HttpException('not found user`s notes', HttpStatus.FORBIDDEN)   
            }

            (await schedules).forEach(obj => {
                if (obj.id == scheduleId) {
                    matchSchedule = obj
                } else {
                    return
                }
            })

            if (matchSchedule) {
                try {
                    await this.dashboardScheduleRepository.delete(matchSchedule.id)
                } catch(err) {
                    console.log(err)
                    throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)   
                }

                return true
            } else {
                throw new HttpException('not found schedule', HttpStatus.BAD_REQUEST)
            }
        } else {
            throw new HttpException('not found user', HttpStatus.NOT_FOUND)   
        }
    }
}
