// src/coins3/coins3.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class Coins3Service {
  constructor(private readonly httpService: HttpService) {}

  async getMarketChartData(id: string, vs_currency: string, days: string) {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
    try {
      const response = await this.httpService
        .get(url, {
          params: {
            vs_currency,
            days,
            interval: 'daily', // Optional: you can change this if needed
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching market chart data: ${error.message}`);
    }
  }
}
