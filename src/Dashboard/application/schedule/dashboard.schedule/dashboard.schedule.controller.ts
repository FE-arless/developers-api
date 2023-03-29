import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateScheduleDTO } from 'src/Dashboard/domain/dto/schedule/create.schedule.dto';
import { UpdateScheduleDTO } from 'src/Dashboard/domain/dto/schedule/update.schedule.dto';
import { DashboardSchedule } from 'src/Dashboard/domain/entities/dashboard.schedule';
import { DashboardScheduleService } from 'src/Dashboard/domain/service/calendar/dashboard.schedule.service';
import { User } from 'src/Users/domain/entities/user';

@ApiTags('Dashboard_Schedule')
@ApiBearerAuth()
@Controller('dashboard/schedule')
export class DashboardScheduleController {
    constructor(
        private readonly dashboardScheduleService: DashboardScheduleService
    ){}

    @UseGuards(AuthGuard('access'))
    @Get('')
    async getSchedules(@Req() req: Request): Promise<DashboardSchedule[] | undefined> {
        return await this.dashboardScheduleService.getSchedule((req.user as User).email)
    }

    @UseGuards(AuthGuard('access'))
    @ApiBody({type: CreateScheduleDTO})
    @Post('create')
    async createNote(@Req() req: Request, @Body() noteInfo: CreateScheduleDTO): Promise<DashboardSchedule | undefined> {
        return await this.dashboardScheduleService.createSchedule((req.user as User).email, noteInfo)
    }

    @UseGuards(AuthGuard('access'))
    @ApiBody({type: UpdateScheduleDTO})
    @Post('update')
    async updateNote(@Req() req: Request, @Body() noteInfo: UpdateScheduleDTO): Promise<DashboardSchedule | undefined> {
        return await this.dashboardScheduleService.updateSchedule((req.user as User).email, noteInfo)
    }

    @UseGuards(AuthGuard('access'))
    @ApiQuery({ type: Number })
    @Post('delete')
    async deleteNote(@Req() req: Request, @Query('scheduleId') scheduleId: number): Promise<Boolean | undefined> {
        return await this.dashboardScheduleService.deleteSchedule((req.user as User).email, scheduleId)
    }
}
