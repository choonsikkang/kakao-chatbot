import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Kakao-chatbot!';
  }

  // DB 문을 여기에다가 주고, 모델 등은 따로 라우팅 해야될 듯
  // postCoffee
  // updateCoffee
  // deleteCoffee
}
