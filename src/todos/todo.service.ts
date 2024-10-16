import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity'; // Domain entity
import { ITodo } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(title: string, description: string): Promise<Todo> {
    const newTodo = this.todoRepository.create({ title, description });
    return await this.todoRepository.save(newTodo);
  }

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getById(id: FindOneOptions<Todo>): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateTodo(todo: ITodo): Promise<Todo> {
    const foundTodo = await this.todoRepository.findOne(todo.id);

    if (!foundTodo) throw new NotFoundException('Todo not found');

    foundTodo.title = todo.title;
    foundTodo.description = todo.description;
    foundTodo.isCompleted = todo.isCompleted;

    return await this.todoRepository.save(foundTodo);
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Todo not found');

    return result;
  }
}
