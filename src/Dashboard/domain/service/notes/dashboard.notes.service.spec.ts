import { Test, TestingModule } from '@nestjs/testing';
import { DashboardNotesService } from './dashboard.notes.service';

describe('DashboardNotesService', () => {
  let service: DashboardNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardNotesService],
    }).compile();

    service = module.get<DashboardNotesService>(DashboardNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
