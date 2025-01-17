import { Test, TestingModule } from '@nestjs/testing';
import { SolTrending2Controller } from './sol-trending2.controller';

describe('SolTrending2Controller', () => {
  let controller: SolTrending2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolTrending2Controller],
    }).compile();

    controller = module.get<SolTrending2Controller>(SolTrending2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
