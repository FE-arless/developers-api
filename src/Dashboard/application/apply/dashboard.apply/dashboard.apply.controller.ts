import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard_Apply')
@Controller('dashboard/apply')
export class DashboardApplyController {}
