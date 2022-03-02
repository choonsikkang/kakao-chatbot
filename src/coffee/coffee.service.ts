import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { basket } from './entity/basket.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(basket)
    private basketRepository: Repository<basket>,
  ) {}

  // 장바구니에 담긴 coffee를 모두 조회
  findAll(): Promise<basket[]> {
    return this.basketRepository.find();
  }

  // 장바구니에 먹고 싶은 음료를 생성
  async create(basket: basket): Promise<void> {
    await this.basketRepository.save(basket);
  }
}
