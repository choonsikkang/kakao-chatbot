import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './coffee.module';
import { CoffeeService } from './coffee.service';
import { basket } from './entity/basket.entity';
import { coffee } from './entity/coffee.entity';
import { user } from './entity/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('CoffeeService', () => {
  let service: CoffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeeModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'kakao_chatbot_test',
          entities: [basket, user, coffee],
          synchronize: true,
          logging: false,
          keepConnectionAlive: true,
        }),
      ],
      providers: [CoffeeService],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should return create Coffee', async () => {
      const result = await service.create({
        name: '아이스 아메리카노',
        amount: '3',
      });

      const coffeename = '아이스 아메리카노';
      const amount = '3';
      const newCoffee = await service.create({ coffeename, amount });

      expect(newCoffee).toEqual(result);
    });

    it('should return a 404', async () => {
      try {
        await service.create({
          name: '노카리메아 스이아',
          amount: 999,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should return delete the Coffee', async () => {
      const result = await service.delete();
      expect(result).toBeInstanceOf(Object);
    });
    it('should return a 400', async () => {
      try {
        await service.delete();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Hello Menu', () => {
    it('should return menu', async () => {
      const responseBody = {
        version: '2.0',
        template: {
          outputs: [
            {
              simpleText: {
                text: '안녕 난 애기 메뉴판!😁',
              },
            },
          ],
          quickReplies: [
            {
              messageText: '커피',
              action: 'message',
              label: '커피',
            },
            {
              messageText: '음료',
              action: 'message',
              label: '음료',
            },
            {
              messageText: '스페셜',
              action: 'message',
              label: '스페셜',
            },
            {
              messageText: '차',
              action: 'message',
              label: '차',
            },
          ],
        },
      };
      expect(await service.menu()).toEqual(responseBody);
    });
  });

  describe('Hello confirm', () => {
    it('should return confirm', async () => {
      const result = await service.confirm();
      expect(result).toBeInstanceOf(Object);
    });
  });
});
