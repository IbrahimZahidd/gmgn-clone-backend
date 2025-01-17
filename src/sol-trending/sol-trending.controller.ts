import { Controller, Get, Query } from '@nestjs/common';
import { SolTrendingService } from './sol-trending.service';

@Controller() // Empty string to handle root route
export class SolTrendingController {
  constructor(private readonly solTrendingService: SolTrendingService) {}

  @Get()
  async getTrendingCoins(@Query('chain') chain: string) {
    if (chain !== 'sol') {
      return { error: 'Invalid chain parameter' };
    }
    return await this.solTrendingService.getTrendingCoins();
  }
}
