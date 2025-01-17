import { Module } from '@nestjs/common';
import { SolTrendingModule } from './sol-trending/sol-trending.module';
import { SolTrending2Module } from './sol-trending2/sol-trending2.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [SolTrendingModule, SolTrending2Module, FirebaseModule],
  controllers: [], // Remove AppController
  providers: [], // Remove AppService
})
export class AppModule {}
