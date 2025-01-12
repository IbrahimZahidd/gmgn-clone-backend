import { Test, TestingModule } from '@nestjs/testing';
import { Coins1Controller } from './coins1.controller';

describe('Coins1Controller', () => {
  let controller: Coins1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Coins1Controller],
    }).compile();

    controller = module.get<Coins1Controller>(Coins1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
