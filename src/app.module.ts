import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { Coins2Module } from './coins2/coins2.module';
import { Coins3Module } from './coins3/coins3.module';
import { Coins1Module } from './coins1/coins1.module';

@Module({
  imports: [CoinsModule, Coins2Module, Coins3Module, Coins1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
