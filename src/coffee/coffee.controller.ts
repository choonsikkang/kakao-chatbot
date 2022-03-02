import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { basket } from './entity/basket.entity';

@Controller('')
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}

  @Get()
  findAll(): Promise<basket[]> {
    return this.coffeeService.findAll();
  }

  @Post()
  create(@Body() coffee: basket) {
    this.coffeeService.create(coffee);
  }
}
