import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todo.model'; // Domain entity

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async createTodo(title: string, description: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, description });
    return newTodo.save();
  }

  async getTodos(): Promise<Todo[]> {
    const data = this.todoModel.find().exec();
    console.log(data);

    return data;
  }

  async updateTodo() {}

  async deleteTodo() {}
}
