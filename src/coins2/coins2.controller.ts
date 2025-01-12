// src/coins2/coins2.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { Coins2Service } from './coins2.service';

@Controller('coins2')
export class Coins2Controller {
  constructor(private readonly coins2Service: Coins2Service) {}

  // Endpoint to fetch market data for all coins
  @Get('market-data')
  async getMarketData(
    @Query('vsCurrency') vsCurrency: string = 'usd', // Default to USD
    @Query('perPage') perPage: number = 100, // Default to 100
    @Query('page') page: number = 1, // Default to page 1
  ) {
    let allCoinsData = [];
    let currentPage = page;
    let totalPages = 1;

    try {
      // Loop through pages to get data for all coins
      while (currentPage <= totalPages) {
        const marketData = await this.coins2Service.getMarketData(
          vsCurrency,
          perPage,
          currentPage,
        );
        allCoinsData = [...allCoinsData, ...marketData];

        // If less than perPage results are returned, stop pagination
        totalPages =
          marketData.length === perPage ? currentPage + 1 : currentPage;
        currentPage++;
      }

      return allCoinsData; // Return the aggregated data for all pages
    } catch (error) {
      console.error('Error in controller:', error.message);
      throw error; // Let NestJS handle the error response
    }
  }
}
