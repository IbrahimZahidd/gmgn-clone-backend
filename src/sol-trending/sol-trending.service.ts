import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RateLimiter } from './utils/rate-limiter';
import { TrendingCoin } from './interfaces/trending-coin.interface';
import { catchError, timeout } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';
import { SolTrending2Service } from '../sol-trending2/sol-trending2.service';

@Injectable()
export class SolTrendingService {
  private readonly COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
  private readonly rateLimiter = new RateLimiter();
  private readonly logger = new Logger(SolTrendingService.name);
  private cachedData: TrendingCoin[] = [];
  private lastCacheTime: number = 0;
  private readonly CACHE_DURATION = 120000; // 2 minutes cache

  constructor(
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
    private readonly solTrending2Service: SolTrending2Service,
  ) {}

  async getTrendingCoins(): Promise<TrendingCoin[]> {
    try {
      // Check cache first
      if (this.isCacheValid()) {
        this.logger.log('Returning cached data');
        return this.cachedData;
      }

      // Respect rate limit
      await this.rateLimiter.throttle();

      this.logger.log('Fetching data from CoinGecko...');
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${this.COINGECKO_API_URL}/coins/markets`, {
            params: {
              vs_currency: 'usd',
              price_change_percentage: '1h,24h,7d',
            },
          })
          .pipe(
            timeout(5000),
            catchError((error) => {
              if (error.response?.status === 429) {
                throw new HttpException(
                  'Rate limit exceeded. Please try again later.',
                  HttpStatus.TOO_MANY_REQUESTS,
                );
              }
              throw new HttpException(
                'Failed to fetch data',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      // Transform the data
      this.cachedData = data.map(this.transformCoinData);
      this.lastCacheTime = Date.now();

      // Save to Firebase
      this.logger.log('Saving data to Firebase...');
      await this.firebaseService.saveCoinsData(this.cachedData);
      this.logger.log('Data saved to Firebase successfully');

      // Trigger sol-trending2 update after saving to Firebase
      this.solTrending2Service.updateCoinsWithAge().catch((error) => {
        this.logger.error('Error updating coins age:', error);
      });

      return this.cachedData;
    } catch (error) {
      this.logger.error(`Error in getTrendingCoins: ${error.message}`);
      throw error;
    }
  }

  private isCacheValid(): boolean {
    return (
      this.cachedData.length > 0 &&
      Date.now() - this.lastCacheTime < this.CACHE_DURATION
    );
  }

  private transformCoinData(coin: any): TrendingCoin {
    return {
      id: coin.id,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_1h: coin.price_change_percentage_1h_in_currency,
      price_change_percentage_24h: coin.price_change_percentage_24h_in_currency,
      price_change_percentage_7d: coin.price_change_percentage_7d_in_currency,
    };
  }
}
