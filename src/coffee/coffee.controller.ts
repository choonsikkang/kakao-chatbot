import { Body, Controller, Delete, Post, Patch, Res } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Logger } from '@nestjs/common';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto/CreateCoffee.dto';
import express, { Response } from 'express';
import { route } from '../../assets/intent.json';

@Controller('')
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}

  // @Get()
  // findAll(): Promise<basket[]> {
  //   return this.coffeeService.findAll();
  // }

  @Post()
  createCoffee(@Body() CreateCoffeeDto: CreateCoffeeDto, @Res() res: Response) {
    Logger.log('이것이 카카오에서 답변해주는 JSON', CreateCoffeeDto);
    const order = this.coffeeService.create(CreateCoffeeDto, res);
    return order;
  }
  // Patch로는 Body의 값이 안온다. 어찌된 일인지...
  @Post('/change')
  updateCoffee(@Body() UpdateCoffeeDto: UpdateCoffeeDto, @Res() res: Response) {
    Logger.log('이것이 카카오에서 답변해주는 JSON', UpdateCoffeeDto);
    const order_change = this.coffeeService.update(UpdateCoffeeDto, res);
    Logger.log(order_change);
    return order_change;
  }

  @Post('/order_cancel')
  deleteCoffee(@Res() res: Response) {
    const order_cancel = this.coffeeService.delete(res);
    return order_cancel;
  }
}
