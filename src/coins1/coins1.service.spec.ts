import { Test, TestingModule } from '@nestjs/testing';
import { Coins1Service } from './coins1.service';

describe('Coins1Service', () => {
  let service: Coins1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Coins1Service],
    }).compile();

    service = module.get<Coins1Service>(Coins1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
