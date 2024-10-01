import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.todoService.createTodo(title, description);
  }

  @Get()
  async getTodos() {
    return this.todoService.getTodos();
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.todoService.updateTodo({
      id,
      title,
      description,
      isCompleted,
    });
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
