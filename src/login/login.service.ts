import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Login } from './login.entity';

@Injectable()
export class LoginService {
    private loginRepository;

    constructor(private dataSource: DataSource) {
        this.loginRepository = this.dataSource.getRepository(Login)
    }

    find(): Promise <Login[]>{
        return this.loginRepository.find({
            withDelete:true
        });
    }
    findAll(): string {
        return 'return all users details  !';
      }

      async create(user: Partial<Login>): Promise<Login> {
        const newuser = this.loginRepository.create(user);
        return this.loginRepository.save(newuser);
      }
}
