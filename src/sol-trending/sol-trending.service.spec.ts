import { Test, TestingModule } from '@nestjs/testing';
import { SolTrendingService } from './sol-trending.service';

describe('SolTrendingService', () => {
  let service: SolTrendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolTrendingService],
    }).compile();

    service = module.get<SolTrendingService>(SolTrendingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
