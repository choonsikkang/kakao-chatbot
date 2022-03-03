import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { basket } from './entity/basket.entity';
import { coffee } from './entity/coffee.entity';
import { user } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([basket, coffee, user])],
  exports: [TypeOrmModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
