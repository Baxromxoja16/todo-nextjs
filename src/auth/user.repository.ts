// src/auth/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
