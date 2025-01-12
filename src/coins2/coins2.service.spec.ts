import { Test, TestingModule } from '@nestjs/testing';
import { Coins2Service } from './coins2.service';

describe('Coins2Service', () => {
  let service: Coins2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Coins2Service],
    }).compile();

    service = module.get<Coins2Service>(Coins2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
