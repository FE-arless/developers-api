import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard_Schedule')
@Controller('dashboard/schedule')
export class DashboardScheduleController {}
