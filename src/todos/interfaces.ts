import { FindOneOptions } from 'typeorm';
import { Todo } from './todo.entity';

export interface Message {
  message: string;
}

export interface ITodo {
  title: string;
  id: FindOneOptions<Todo>;
  description: string;
  isCompleted: boolean;
}
