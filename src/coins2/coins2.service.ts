// src/coins2/coins2.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Coins2Service {
  private readonly url = 'https://api.coingecko.com/api/v3/coins/markets'; // Free API endpoint

  // Fetch market data for all coins (pagination handled here)
  async getMarketData(
    vsCurrency: string,
    perPage: number = 100,
    page: number = 1,
  ) {
    try {
      const response = await axios.get(this.url, {
        params: {
          vs_currency: vsCurrency,
          per_page: perPage, // Default 100 coins per page
          page: page, // Default page 1
          price_change_percentage: '1h,24h', // Timeframes to return the price change percentage
        },
        headers: {
          accept: 'application/json',
        },
      });

      return response.data; // Return the market data for this page
    } catch (error) {
      console.error(
        'Error fetching market data from CoinGecko:',
        error.message,
      );
      throw new Error(
        `Unable to fetch market data for coins: ${error.message}`,
      );
    }
  }
}
