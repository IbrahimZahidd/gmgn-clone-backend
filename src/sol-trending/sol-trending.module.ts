import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SolTrendingController } from './sol-trending.controller';
import { SolTrendingService } from './sol-trending.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { SolTrending2Service } from '../sol-trending2/sol-trending2.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    FirebaseModule,
  ],
  controllers: [SolTrendingController],
  providers: [SolTrendingService, SolTrending2Service],
})
export class SolTrendingModule {}
