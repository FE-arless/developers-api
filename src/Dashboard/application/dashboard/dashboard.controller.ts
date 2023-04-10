import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DashboardApplyService } from 'src/Dashboard/domain/service/apply/dashboard.apply.service';
import { DashboardScheduleService } from 'src/Dashboard/domain/service/calendar/dashboard.schedule.service';
import { DashboardNotesService } from 'src/Dashboard/domain/service/notes/dashboard.notes.service';
import { User } from 'src/Users/domain/entities/user';
import { Any } from 'typeorm';



@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('/api/v1/dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardScheduleService: DashboardScheduleService,
        private readonly dashboardApplyService: DashboardApplyService,
        private readonly dashboardNotesService: DashboardNotesService
    ){}

    @ApiResponse({
        status: 200,
        description: '특정 유저의 대시보드 데이터',
        type: Any,
    })
    @UseGuards(AuthGuard('access'))
    @Get('')
    async getDashboardInfos(@Req() req: Request): Promise<any | undefined> {
        const userEmail = (req.user as User).email

        let thisMonthSchedules = await this.dashboardScheduleService.getSchedule(userEmail);
        let applies = await this.dashboardApplyService.getApplyList(userEmail)
        let notes = await this.dashboardNotesService.getNotes(userEmail)

        return { 
            schedules: thisMonthSchedules,
            applies: applies,
            notes: notes
        }
    }
}
