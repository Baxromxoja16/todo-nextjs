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
import { Todo } from './todo.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneOptions } from 'typeorm';

@ApiTags('todos')
@Controller('todos')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

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
    return this.todoService.createTodo(title, description);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'List of todos.' })
  async getTodo() {
    return this.todoService.getAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'Todo found.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async updateTodo(
    @Param('id') id: FindOneOptions<Todo>,
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
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async getTodoById(@Param('id') id: FindOneOptions<Todo>): Promise<Todo> {
    const todo = await this.todoService.getById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 200, description: 'Todo successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
