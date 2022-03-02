import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { basket } from './entity/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([basket])],
  exports: [TypeOrmModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
