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

  async findUserByFieldName(fieldObject: object) {
    // return "test in services"
    return this.userRepository.findOneBy(fieldObject);
  }

  async update(user) {
    // return "test in services"
    return this.userRepository.save(user);
  }

  async registration(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  } 
  async loginDetails(email: string) {
    // return "test in services" 
    return this.userRepository.findOneBy({ email });
  }

<<<<<<< HEAD

  async updatePassword(userExistPassword) {
    // return "test in services" 
    return this.userRepository.save(userExistPassword);
  } 



  // async findUserByMultipleFieldName(fieldObject: object) {
  //   // return "test in services" 
  //   return this.userRepository.findOneBy(fieldObject);
  // }


  // async findUserByMultipleFields(email: string, mobile: number): Promise<any> {
  //   const user = await this.userRepository.findOne(email);
  //   // return this.userRepository.findOneBy(fields);
  //   if (user && user.password === mobile) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  // }
  
  // async createMultiple(user: Partial<User>): Promise<User> {
  //   const newUser = this.userRepository.create(user);
  //   return this.userRepository.save(newUser);
  // }



  // async findUserByMultipleFields(user: Partial<User>): Promise<User> {
  //   const newuser = this.userRepository.create(user);
  //   return this.userRepository.save(newuser);
  // }

=======
  async checkUserMobileEmail(email: string, mobile: number): Promise<User[]> {
    return this.userRepository.find({
      where: [
        {
          email: email,
        },
        {
          mobile: mobile,
        },
      ],
    });
  }
>>>>>>> ae515c4217fb3fed07a47f5aed9b748e13d8b66e
}



