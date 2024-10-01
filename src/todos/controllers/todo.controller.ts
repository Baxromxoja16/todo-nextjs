import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
