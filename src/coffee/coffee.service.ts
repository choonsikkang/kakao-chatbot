import { Body } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { basket } from './entity/basket.entity';
import { Logger } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(basket)
    private basketRepository: Repository<basket>,
  ) {}

  async create(@Body() coffee) {
    try {
      const response = this.basketRepository.create({
        name: coffee.action.detailParams.coffee_name.value,
        amount: coffee.action.detailParams.CupCount.origin,
      });
      await this.basketRepository.save(response);

      // // 장바구니에 있는 모든 상품들을 조회
      let basketCoffee = await this.basketRepository.find();
      // Logger.log('All baskets from the db: ', JSON.stringify(basketCoffee));

      let text: string = '';
      for (let category of basketCoffee) {
        text += category.name + ' ' + '>' + ' ' + category.amount + '개' + '\n';
      }

      // 장바구니에 있는 음료의 종류, 개수를 합산하여, 총합이 얼마인지 조회
      const total = await this.basketRepository
        .createQueryBuilder()
        .select(['basket.name', 'basket.amount', 'SUM(price*amount) AS total'])
        .innerJoin('coffee', 'coffee')
        .where('coffee.name = basket.name')
        .groupBy('basket.id')
        .getRawMany();

      let sum: number = 0;
      total.forEach((el) => {
        // Logger.log(JSON.stringify(el));
        sum += Number(el.total);
        Logger.log(typeof sum);
      });

      const responseBody = {
        version: '2.0',
        template: {
          outputs: [
            {
              simpleText: {
                text: `++장바구니++\n-----------------------------\n${text}`,
              },
            },
            {
              simpleText: {
                text: `합계 - ${sum}원`,
              },
            },
          ],
          quickReplies: [
            {
              action: 'block',
              label: '주문 끝',
              blockId: '6203772fba2e0d2c1179579b',
            },
            {
              action: 'block',
              label: '주문 수정하기',
              blockId: '6205d90cca92880f0b4e5c6b',
            },
          ],
        },
      };
      return responseBody;
    } catch (err) {
      Logger.log('이것이 에러인가요?', err);
    }
  }

  async update(@Body() coffee) {
    await getConnection()
      .createQueryBuilder()
      .update(basket)
      .set({
        name: coffee.action.detailParams.coffee_name.value,
        amount: coffee.action.detailParams.CupCount.origin,
      })
      .where('name = :name', {
        name: coffee.action.detailParams.coffee_name.value,
      })
      .execute();

    // 장바구니 조회
    let basketCoffee = await this.basketRepository.find();

    let text: string = '';
    for (let category of basketCoffee) {
      text += category.name + ' ' + '>' + ' ' + category.amount + '개' + '\n';
    }

    // 장바구니에 있는 음료의 종류, 개수를 합산하여, 총합이 얼마인지 조회
    const total = await this.basketRepository
      .createQueryBuilder()
      .select(['basket.name', 'basket.amount', 'SUM(price*amount) AS total'])
      .innerJoin('coffee', 'coffee')
      .where('coffee.name = basket.name')
      .groupBy('basket.id')
      .getRawMany();

    let sum: number = 0;
    total.forEach((el) => {
      // Logger.log(JSON.stringify(el));
      sum += Number(el.total);
      Logger.log(typeof sum);
    });

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: `++장바구니++\n-----------------------------\n${text}`,
            },
          },
          {
            simpleText: {
              text: `합계 - ${sum}원`,
            },
          },
        ],
      },
    };
    return responseBody;
  }

  async delete() {
    await this.basketRepository.clear();

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: `++장바구니++\n-----------------------------\n 주문내역이 없습니다. \n`,
            },
          },
        ],
      },
    };
    return responseBody;
  }
}
