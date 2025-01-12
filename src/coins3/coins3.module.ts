// src/coins3/coins3.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Correct import
import { Coins3Controller } from './coins3.controller';
import { Coins3Service } from './coins3.service';

@Module({
  imports: [HttpModule], // HttpModule is needed for making HTTP requests
  controllers: [Coins3Controller],
  providers: [Coins3Service],
})
export class Coins3Module {}
