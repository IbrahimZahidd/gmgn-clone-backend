import { Test, TestingModule } from '@nestjs/testing';
import { SolTrendingController } from './sol-trending.controller';

describe('SolTrendingController', () => {
  let controller: SolTrendingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolTrendingController],
    }).compile();

    controller = module.get<SolTrendingController>(SolTrendingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
