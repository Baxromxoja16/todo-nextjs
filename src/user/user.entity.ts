import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'JohnDoe', description: 'The username of the User' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the User',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'The password of the User' })
  @Column()
  password: string;
}
