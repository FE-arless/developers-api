import { Test, TestingModule } from '@nestjs/testing';
import { DashboardScheduleController } from './dashboard.schedule.controller';

describe('DashboardScheduleController', () => {
  let controller: DashboardScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardScheduleController],
    }).compile();

    controller = module.get<DashboardScheduleController>(DashboardScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
