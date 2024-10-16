// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterDto } from './dto/register.dto'; // DTO for registration data
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

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

    // Here you should hash the password before saving (using bcrypt or similar)
    const newUser = await this.userRepository.createUser({
      username,
      password,
      email,
    });
    return newUser;
  }

  async login(authLoginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findUserByEmail(authLoginDto.email);

    if (!user) {
      throw new Error('User is not found');
    }

    if (user?.password !== authLoginDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
