import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DashboardApplyService } from 'src/Dashboard/domain/service/apply/dashboard.apply.service';
import { DashboardCalendarService } from 'src/Dashboard/domain/service/calendar/dashboard.schedule.service';
import { DashboardNotesService } from 'src/Dashboard/domain/service/notes/dashboard.notes.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardCalendarService: DashboardCalendarService,
        private readonly dashboardApplyService: DashboardApplyService,
        private readonly dashboardNotesService: DashboardNotesService
    ){}


    //get all summary

    //calendar plan this month
    @UseGuards(AuthGuard('access'))
    @Get('/calendar/plan')
    async getCalendarPlan() {

    }

    //calendar 
}
