// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterDto } from './dto/register.dto'; // DTO for registration data

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(authRegisterDto: RegisterDto): Promise<User> {
    const { username, password, email } = authRegisterDto;
    const existingUser = await this.userRepository.findUserByUsername(username);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Here you should hash the password before saving (using bcrypt or similar)
    const newUser = await this.userRepository.createUser({
      username,
      password,
      email,
    });
    return newUser;
  }
}
