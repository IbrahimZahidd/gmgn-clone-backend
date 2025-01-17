import { Controller, Post, HttpStatus, HttpException } from '@nestjs/common';
import { SolTrending2Service } from './sol-trending2.service';

@Controller('sol-trending2')
export class SolTrending2Controller {
  constructor(private readonly solTrending2Service: SolTrending2Service) {}

  @Post('update-ages')
  async updateCoinsAge() {
    try {
      const updatedCoins = await this.solTrending2Service.updateCoinsWithAge();
      return {
        message: 'Successfully updated coins with age data',
        count: updatedCoins?.length || 0,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update coins age',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
