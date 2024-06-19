import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

export interface UserRepository extends Repository<Users> {
  this: Repository<Users>;
  getUsers(): Promise<Users[]>;
  getUser(id: number): Promise<Users>;
  createUser(user: { firstName: string; lastName: string; isActive: boolean });
}