import { Module } from '@nestjs/common';
import { Coins1Service } from './coins1.service';
import { Coins1Controller } from './coins1.controller';

@Module({
  providers: [Coins1Service],
  controllers: [Coins1Controller]
})
export class Coins1Module {}
