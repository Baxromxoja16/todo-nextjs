import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.model'; // Domain entity
import { ITodo, Message } from './interfaces';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async createTodo(title: string, description: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, description });
    return await newTodo.save();
  }

  async getAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async getById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateTodo(todo: ITodo): Promise<Todo> {
    const foundTodo = await this.todoModel.findById(todo.id);

    if (!foundTodo) throw new NotFoundException('Todo not found');

    foundTodo.title = todo.title;
    foundTodo.description = todo.description;
    foundTodo.isCompleted = todo.isCompleted;

    foundTodo.save();

    return foundTodo;
  }

  async deleteTodo(id: string): Promise<Message> {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Todo not found');

    return { message: 'Todo successfully deleted' };
  }
}

// postgressda
// getbyid
// swagger
