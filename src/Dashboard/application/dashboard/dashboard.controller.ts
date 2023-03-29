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
@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardScheduleService: DashboardScheduleService,
        private readonly dashboardApplyService: DashboardApplyService,
        private readonly dashboardNotesService: DashboardNotesService
    ){}


    @UseGuards(AuthGuard('access'))
    @ApiResponse({
        type: Any
    })
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
