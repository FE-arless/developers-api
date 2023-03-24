import { Test, TestingModule } from '@nestjs/testing';
import { DashboardCalendarController } from './dashboard.schedule.controller';

describe('DashboardCalendarController', () => {
  let controller: DashboardCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardCalendarController],
    }).compile();

    controller = module.get<DashboardCalendarController>(DashboardCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
