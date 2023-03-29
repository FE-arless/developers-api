import { Test, TestingModule } from '@nestjs/testing';
import { DashboardApplyController } from './dashboard.apply.controller';

describe('DashboardApplyController', () => {
  let controller: DashboardApplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardApplyController],
    }).compile();

    controller = module.get<DashboardApplyController>(DashboardApplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
