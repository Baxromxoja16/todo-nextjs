import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

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
  async getTodo() {
    return this.todoService.getAll();
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

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.getById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
