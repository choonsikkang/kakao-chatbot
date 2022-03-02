import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './coffee/coffee.module';
import { basket } from './coffee/entity/basket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: 3306,
      username: 'choonsik',
      password: '1234',
      database: 'kakao_chatbot',
      entities: [basket],
      synchronize: true, // 엔터티 만들고 나면 테이블을 자동으로 생성, 개발모드에서만 사용하는 것이 좋다.
    }),
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
