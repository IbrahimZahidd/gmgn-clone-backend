// src/coins3/coins3.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { Coins3Service } from './coins3.service';

@Controller('coins3')
export class Coins3Controller {
  constructor(private readonly coins3Service: Coins3Service) {}

  @Get('market_chart')
  async getMarketChart(
    @Query('id') id: string,
    @Query('vs_currency') vs_currency: string,
    @Query('days') days: string,
  ) {
    // Fetch market chart data using the service
    const data = await this.coins3Service.getMarketChartData(
      id,
      vs_currency,
      days,
    );

    // Return the response
    return {
      prices: data.prices,
      market_caps: data.market_caps,
      total_volumes: data.total_volumes,
    };
  }
}
