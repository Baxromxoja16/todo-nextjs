import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]), // Registers Todo entity
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
