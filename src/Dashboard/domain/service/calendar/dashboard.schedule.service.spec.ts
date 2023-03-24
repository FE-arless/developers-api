import { Test, TestingModule } from '@nestjs/testing';
import { DashboardCalendarService } from './dashboard.schedule.service';

describe('DashboardCalendarService', () => {
  let service: DashboardCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardCalendarService],
    }).compile();

    service = module.get<DashboardCalendarService>(DashboardCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
