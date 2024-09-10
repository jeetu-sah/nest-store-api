import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  private userRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  findAll(): string {
    return 'return all users details  !';
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async delete(id: number) {
    // return "test in services" 
    return this.userRepository.delete(id);
  }

  async details(id: number) {
    // return "test in services" 
    return this.userRepository.findOneBy({ id });
  }

}
