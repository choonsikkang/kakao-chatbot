import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './coffee/coffee.module';
import { basket } from './coffee/entity/basket.entity';
import { coffee } from './coffee/entity/coffee.entity';
import { user } from './coffee/entity/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [basket, coffee, user],
      synchronize: true, // 엔터티 만들고 나면 테이블을 자동으로 생성, 개발모드에서만 사용하는 것이 좋다.
      logging: true, // DB log를 보여주는 옵션
    }),
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
