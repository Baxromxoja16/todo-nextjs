import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = this.create({ username, email, password });
    return this.save(user);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    await this.update(id, updateData);
    return this.findOne(id as FindOneOptions<User>);
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async getUser(id: FindOneOptions<User>): Promise<User> {
    return this.findOne(id);
  }

  async getUsers(): Promise<User[]> {
    return this.find();
  }

  async getUserById(id: FindOneOptions<User>): Promise<User> {
    return this.findOne(id);
  }
}
