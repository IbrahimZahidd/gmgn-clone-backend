import { Test, TestingModule } from '@nestjs/testing';
import { SolTrending2Service } from './sol-trending2.service';

describe('SolTrending2Service', () => {
  let service: SolTrending2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolTrending2Service],
    }).compile();

    service = module.get<SolTrending2Service>(SolTrending2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
