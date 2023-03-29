import { Test, TestingModule } from '@nestjs/testing';
import { DashboardScheduleService } from './dashboard.schedule.service';

describe('DashboardCalendarService', () => {
  let service: DashboardScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardScheduleService],
    }).compile();

    service = module.get<DashboardScheduleService>(DashboardScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
