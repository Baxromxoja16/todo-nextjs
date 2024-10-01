import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todos/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
