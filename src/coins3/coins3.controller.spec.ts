import { Test, TestingModule } from '@nestjs/testing';
import { Coins3Controller } from './coins3.controller';

describe('Coins3Controller', () => {
  let controller: Coins3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Coins3Controller],
    }).compile();

    controller = module.get<Coins3Controller>(Coins3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
