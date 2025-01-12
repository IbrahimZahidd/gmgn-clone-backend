// src/coins2/coins2.module.ts
import { Module } from '@nestjs/common';
import { Coins2Service } from './coins2.service';
import { Coins2Controller } from './coins2.controller';

@Module({
  providers: [Coins2Service],
  controllers: [Coins2Controller],
})
export class Coins2Module {}
