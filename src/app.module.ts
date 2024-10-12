import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todos/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config(); // Load environment variables

@Module({
  imports: [  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.model{.ts,.js}'],
    synchronize: true, 
  }), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
