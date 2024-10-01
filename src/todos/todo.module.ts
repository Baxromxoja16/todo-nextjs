import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { Todo, TodoSchema } from './models/todo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]), // Registers Todo model
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
