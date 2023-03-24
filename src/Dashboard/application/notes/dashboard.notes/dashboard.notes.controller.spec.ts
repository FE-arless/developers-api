import { Test, TestingModule } from '@nestjs/testing';
import { DashboardNotesController } from './dashboard.notes.controller';

describe('DashboardNotesController', () => {
  let controller: DashboardNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardNotesController],
    }).compile();

    controller = module.get<DashboardNotesController>(DashboardNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
