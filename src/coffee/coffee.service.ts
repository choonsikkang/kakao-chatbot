import { Body, Res, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { basket } from './entity/basket.entity';
import { Logger } from '@nestjs/common';
import express, { Response } from 'express';
import { coffee } from './entity/coffee.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(basket)
    private basketRepository: Repository<basket>,
  ) {}

  // findAll(): Promise<basket[]> {
  //   return this.basketRepository.find();
  // }

  // 장바구니에 먹고 싶은 음료를 생성 및 조회
  async create(@Body() coffee, @Res() res: Response) {
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
        // Logger.log(JSON.stringify(category));
        text += category.name + ' ' + '>' + ' ' + category.amount + '개' + '\n';
      }

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
                text: `합계 - 4500원`,
              },
            },
          ],
          quickReplies: [
            {
              action: 'block',
              label: '주문 끝',
              // blockId: process.env.confirm_blockId,
            },
            {
              action: 'block',
              label: '주문 수정하기',
              // blockId: process.env.modify_blockId,
            },
          ],
        },
      };
      res.status(HttpStatus.OK).json(responseBody);
    } catch (err) {
      Logger.log('이것이 에러인가요?', err);
    }
  }

  // 장바구니에 있는 음료를 변경
  async update(@Body() coffee, @Res() res: Response) {
    // Logger.log('이것이 카카오에서 답변해주는 JSON', coffee);
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

    // const repo = this.basketRepository.update(coffee, res);
    // await repo.update(
    //   {
    //     name: coffee.action.detailParams.coffee_name.value,
    //     amount: coffee.action.detailParams.CupCount.origin,
    //   },
    //   {
    //     data: `update`,
    //   },
    // );

    // 장바구니 조회
    let basketCoffee = await this.basketRepository.find();

    let text: string = '';
    for (let category of basketCoffee) {
      text += category.name + ' ' + '>' + ' ' + category.amount + '개' + '\n';
    }

    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: `++장바구니++\n-----------------------------\n${text}`,
            },
          },
        ],
      },
    };
    res.status(200).send(responseBody);
  }

  // 장바구니에 있는 음료를 모두 삭제
  async delete(@Res() res: Response) {
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
    res.status(200).send(responseBody);
  }
}
