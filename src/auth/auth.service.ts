// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { RegisterDto } from './dto/register.dto'; // DTO for registration data
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: RegisterDto): Promise<User> {
    const { username, password, email } = authRegisterDto;
    const existingUser = await this.userRepository.findUserByUsername(username);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      username,
      password: hashedPassword,
      email,
    });
    return newUser;
  }

  async login(authLoginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(authLoginDto.email);

    if (!user) {
      throw new Error('User is not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new Error('Password is incorrect!');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
