import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    return this.userRepository.createUser(username, email, password);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(id, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  async getUser(id: FindOneOptions<User>): Promise<User> {
    return this.userRepository.getUser(id);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserById(id: FindOneOptions<User>): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}
