import { Test, TestingModule } from '@nestjs/testing';
import { DashboardApplyService } from './dashboard.apply.service'; 

describe('DashboardApplyService', () => {
  let service: DashboardApplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardApplyService],
    }).compile();

    service = module.get<DashboardApplyService>(DashboardApplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
