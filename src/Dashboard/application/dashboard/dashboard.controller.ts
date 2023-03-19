import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from 'src/Dashboard/domain/service/dashboard.calendar.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ){}

    @UseGuards(AuthGuard('access'))
    @Get('/calendar/plan')
    async getCalendarPlan()
}
