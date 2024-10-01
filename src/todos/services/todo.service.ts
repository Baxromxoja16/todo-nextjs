import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Successfully, Todo } from '../models/todo.model'; // Domain entity

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async createTodo(title: string, description: string): Promise<Successfully> {
    const newTodo = new this.todoModel({ title, description });
    newTodo.save();
    return { message: 'POST request successfully received' };
  }

  async getTodos(): Promise<Todo[]> {
    const data = this.todoModel.find().exec();
    return data;
  }

  async updateTodo() {}

  async deleteTodo() {}
}
