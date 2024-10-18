import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneOptions } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { ITodo } from './interfaces';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'Todo craeted',
    type: Todo,
  })
  @ApiOperation({ summary: 'Create a new todo' }) // Summary of the operation
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return await this.todoService.createTodo(title, description);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of todos.' })
  async getTodo() {
    return await this.todoService.getAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'Todo found.' })
  @ApiResponse({
    status: 404,
    description: 'The todo has been successfully updated',
  })
  async updateTodo(@Param() id: string, @Body() todo: ITodo): Promise<Todo> {
    return await this.todoService.updateTodo(id, {
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    } as Todo);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({
    status: 200,
    description: 'Todo found',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async getTodoById(@Param('id') id: FindOneOptions<Todo>): Promise<Todo> {
    const todo = await this.todoService.getById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 200, description: 'Todo successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async deleteTodo(@Param('id') id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
