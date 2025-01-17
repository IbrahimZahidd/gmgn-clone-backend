import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SolTrending2Service } from './sol-trending2.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  providers: [SolTrending2Service],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    FirebaseModule,
  ],
})
export class SolTrending2Module {}
