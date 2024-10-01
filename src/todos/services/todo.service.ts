import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todo.model'; // Domain entity
import { ITodo, Message } from '../interfaces';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async createTodo(title: string, description: string): Promise<Message> {
    const newTodo = new this.todoModel({ title, description });
    newTodo.save();
    return { message: 'POST request successfully received' };
  }

  async getTodos(): Promise<Todo[]> {
    const data = this.todoModel.find().exec();
    return data;
  }

  async updateTodo(todo: ITodo) {
    const foundTodo = await this.todoModel.findById(todo.id);

    if (!foundTodo) throw new NotFoundException('Todo not found');

    foundTodo.title = todo.title;
    foundTodo.description = todo.description;
    foundTodo.isCompleted = todo.isCompleted;

    foundTodo.save();

    return { message: 'Todo successfully updated' };
  }

  async deleteTodo(id: string): Promise<Message> {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Todo not found');

    return { message: 'Todo successfully deleted' };
  }
}
