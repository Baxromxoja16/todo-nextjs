import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
