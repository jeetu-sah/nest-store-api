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
    return this.userRepository.find({
      withDelete:true
    });
  }

  findAll(): string {
    return 'return all users details  !';
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async delete(id: number) { 
    return this.userRepository.softDelete(id);
  }

  async details(id: number) { 
    return this.userRepository.findOneBy({ id });
  }

  async findUserByFieldName(fieldObject: object) { 
    return this.userRepository.findOneBy(fieldObject);
  }

  async update(user) { 
    return this.userRepository.save(user);
  }

  async registration(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  } 

  async loginDetails(email: string) {
    return this.userRepository.findOneBy({ email });
  } 

  async updatePassword(userExistPassword) { 
    return this.userRepository.save(userExistPassword);
  }  
  
  async checkUserMobileEmail(email: string, mobile: number): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { email: email },
        {
          mobile: mobile,
        },
      ],
    });
  }
}



