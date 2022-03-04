import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Logger } from '@nestjs/common';

@Controller()
export class CoffeeController {
  constructor(private coffeeService: CoffeeService) {}

  // 장바구니에 있는 음료들을 생성 및 조회
  @Post()
  @HttpCode(201)
  createCoffee(@Body() CreateCoffee) {
    Logger.log(CreateCoffee);
    const order = this.coffeeService.create(CreateCoffee);
    return order;
  }

  // 장바구니에 담긴 음료들을 수정
  @Post('/change')
  @HttpCode(200)
  updateCoffee(@Body() UpdateCoffee) {
    const order_change = this.coffeeService.update(UpdateCoffee);
    return order_change;
  }

  // 장바구니에 있는 음료를 모두 삭제
  @Post('/order_cancel')
  @HttpCode(200)
  deleteCoffee() {
    const order_cancel = this.coffeeService.delete();
    return order_cancel;
  }

  // 장바구니에 있는 음료의 종류, 개수를 합산하여, 총합이 얼마인지 조회
}
