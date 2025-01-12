import { Test, TestingModule } from '@nestjs/testing';
import { Coins3Service } from './coins3.service';

describe('Coins3Service', () => {
  let service: Coins3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Coins3Service],
    }).compile();

    service = module.get<Coins3Service>(Coins3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
