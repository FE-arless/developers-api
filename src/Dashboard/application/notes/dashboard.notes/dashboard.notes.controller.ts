import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard_Notes')
@Controller('dashboard/notes')
export class DashboardNotesController {}
