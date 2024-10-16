import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Buy groceries',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'A brief description of the todo item',
    example: 'Milk, eggs, and bread',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Indicates whether the todo item is completed',
    default: false,
  })
  @Column({ default: false })
  isCompleted: boolean;
}
