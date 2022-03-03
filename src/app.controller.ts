import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// const config = require('../assets/intent.json');
// import * as config from '../assets/intent.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Post('/confirm')
  confirm() {
    const responseBody = {
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '이대로 주문하시겠어요?',
            },
          },
        ],
        quickReplies: [
          {
            messageText: '아직 개발단계예요😭',
            action: 'block',
            label: '네',
            blockId: '620378a6898c0b33ba3f3233',
          },
          {
            messageText: '아직 개발단계예요😭',
            action: 'message',
            label: '아니요',
          },
        ],
      },
    };
    return responseBody;
  }

  @Post('/menu')
  menu() {
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
    return responseBody;
  }
}
