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
    Logger.log(CreateCoffee)
    return this.coffeeService.create(CreateCoffee);
  }

  // 장바구니에 담긴 음료들을 수정
  @Post('/change')
  @HttpCode(200)
  updateCoffee(@Body() UpdateCoffee) {
    return this.coffeeService.update(UpdateCoffee);
  }

  // 장바구니에 있는 음료를 모두 삭제
  @Post('/order_cancel')
  @HttpCode(200)
  deleteCoffee() {
    return this.coffeeService.delete();
  }

  @Post('/menu')
  @HttpCode(200)
  menu(){
    return this.coffeeService.menu();
  }

  @Post('/confirm')
  @HttpCode(200)
  confirm() {
    return this.coffeeService.confirm();
  }
}
