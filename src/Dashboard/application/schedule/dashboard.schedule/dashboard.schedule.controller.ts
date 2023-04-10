import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateScheduleDTO } from 'src/Dashboard/domain/dto/schedule/create.schedule.dto';
import { UpdateScheduleDTO } from 'src/Dashboard/domain/dto/schedule/update.schedule.dto';
import { DashboardSchedule } from 'src/Dashboard/domain/entities/dashboard.schedule';
import { DashboardScheduleService } from 'src/Dashboard/domain/service/calendar/dashboard.schedule.service';
import { User } from 'src/Users/domain/entities/user';

@ApiTags('Dashboard_Schedule')
@ApiBearerAuth()
@Controller('/api/v1/dashboard/schedule')
export class DashboardScheduleController {
    constructor(
        private readonly dashboardScheduleService: DashboardScheduleService
    ){}

    @ApiResponse({
        status: 200,
        description: '특정 유저의 현재 월간 스케줄',
        type: Array<DashboardSchedule>,
    })
    @UseGuards(AuthGuard('access'))
    @Get('')
    async getSchedules(@Req() req: Request): Promise<DashboardSchedule[] | undefined> {
        return await this.dashboardScheduleService.getSchedule((req.user as User).email)
    }


    @ApiBody({type: CreateScheduleDTO})
    @ApiResponse({
        status: 200,
        description: '특정 유저의 스케줄 생성한 후 데이터',
        type: DashboardSchedule,
    })
    @UseGuards(AuthGuard('access'))
    @Post('create')
    async createSchedule(@Req() req: Request, @Body() noteInfo: CreateScheduleDTO): Promise<DashboardSchedule | undefined> {
        return await this.dashboardScheduleService.createSchedule((req.user as User).email, noteInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 스케줄을 수정하고 난 후 데이터',
        type: DashboardSchedule,
    })
    @UseGuards(AuthGuard('access'))
    @ApiBody({type: UpdateScheduleDTO})
    @Post('update')
    async updateSchedule(@Req() req: Request, @Body() noteInfo: UpdateScheduleDTO): Promise<DashboardSchedule | undefined> {
        return await this.dashboardScheduleService.updateSchedule((req.user as User).email, noteInfo)
    }

    @ApiResponse({
        status: 200,
        description: '특정 유저의 스케줄 삭제여부',
        type: Boolean,
    })
    @UseGuards(AuthGuard('access'))
    @ApiQuery({ type: Number })
    @Post('delete')
    async deleteNote(@Req() req: Request, @Query('scheduleId') scheduleId: number): Promise<Boolean | undefined> {
        return await this.dashboardScheduleService.deleteSchedule((req.user as User).email, scheduleId)
    }
}
