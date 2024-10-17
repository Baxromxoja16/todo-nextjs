import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]), // Registers Todo entity
    AuthModule,
    JwtModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
