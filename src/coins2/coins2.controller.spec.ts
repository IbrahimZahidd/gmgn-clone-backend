import { Test, TestingModule } from '@nestjs/testing';
import { Coins2Controller } from './coins2.controller';

describe('Coins2Controller', () => {
  let controller: Coins2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Coins2Controller],
    }).compile();

    controller = module.get<Coins2Controller>(Coins2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
