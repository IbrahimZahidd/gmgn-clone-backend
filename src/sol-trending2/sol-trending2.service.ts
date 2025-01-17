import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FirebaseService } from '../firebase/firebase.service';
import { firstValueFrom } from 'rxjs';

interface CoinGeckoResponse {
  genesis_date: string;
  // Add other fields if needed
}

@Injectable()
export class SolTrending2Service {
  private readonly COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
  private readonly logger = new Logger(SolTrending2Service.name);
  private readonly BATCH_SIZE = 10;
  private readonly BATCH_INTERVAL = 60000;
  private readonly REQUEST_DELAY = 6000;

  constructor(
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
  ) {}

  private calculateAgeInDays(genesisDate: string): number {
    if (!genesisDate) return 0;
    const genesis = new Date(genesisDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - genesis.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private async fetchCoinData(id: string, retryCount = 0): Promise<number> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ genesis_date: string }>(
          `${this.COINGECKO_API_URL}/coins/${id}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: false,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
          },
        ),
      );
      // console.log(
      //   'The genesis date for ',
      //   id,
      //   ' is:',
      //   response.data.genesis_date,
      // );
      return this.calculateAgeInDays(response.data.genesis_date);
    } catch (error) {
      if (error.response?.status === 429) {
        this.logger.warn(`Rate limit hit for ${id}, waiting 60 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait full minute
        return this.fetchCoinData(id, retryCount + 1);
      }
      this.logger.error(`Failed to fetch coin ${id}: ${error.message}`);
      return 0;
    }
  }

  private async processBatch(coinIds: string[]): Promise<Map<string, number>> {
    const ageMap = new Map<string, number>();

    // Process one coin at a time with longer delay
    for (const id of coinIds) {
      try {
        const age = await this.fetchCoinData(id);
        ageMap.set(id, age);
        // Wait 10 seconds between requests
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (error) {
        this.logger.error(`Error processing coin ${id}: ${error.message}`);
        ageMap.set(id, 0);
      }
    }
    return ageMap;
  }

  async updateCoinsWithAge() {
    try {
      const coinsData = await this.firebaseService.getCoinsData();
      if (!coinsData || !coinsData.length) {
        throw new Error('No coins data found in Firebase');
      }

      const coinIds = coinsData.map((coin) => coin.id);
      const ageMap = new Map<string, number>();

      for (let i = 0; i < coinIds.length; i += this.BATCH_SIZE) {
        const batchStart = Date.now();
        const batchIds = coinIds.slice(i, i + this.BATCH_SIZE);

        this.logger.log(
          `Processing batch ${Math.floor(i / this.BATCH_SIZE) + 1}: coins ${
            i + 1
          } to ${i + batchIds.length}`,
        );

        const batchAgeMap = await this.processBatch(batchIds);
        batchAgeMap.forEach((age, id) => ageMap.set(id, age));

        const updatedCoinsData = coinsData.map((coin) => ({
          ...coin,
          age: ageMap.get(coin.id) || coin.age || 0,
        }));
        await this.firebaseService.saveCoinsData(updatedCoinsData);

        const elapsed = Date.now() - batchStart;
        if (
          elapsed < this.BATCH_INTERVAL &&
          i + this.BATCH_SIZE < coinIds.length
        ) {
          await new Promise((resolve) =>
            setTimeout(resolve, this.BATCH_INTERVAL - elapsed),
          );
        }
      }

      this.logger.log('Successfully updated all coins with age data');
      return coinsData;
    } catch (error) {
      this.logger.error('Error in updateCoinsWithAge:', error);
      throw error;
    }
  }
}
