import { Injectable } from '@nestjs/common';
import { userOtp } from './userotp.entity';
import { DataSource } from 'typeorm';
// import * as speakeasy from "speakeasy";
@Injectable()
export class UserotpService {
  private userotpRepository;

  constructor(private dataSource: DataSource) {
    this.userotpRepository = this.dataSource.getRepository(userOtp);
  }

  find(): Promise<userOtp[]> {
    return this.userotpRepository.find();
  }
  findAll(): string {
    return 'return all users details  !';
  }
  async create(newotp: Partial<userOtp>): Promise<userOtp> {
    const newuser = this.userotpRepository.create(newotp);
  
    return this.userotpRepository.save(newuser);
  }
  async findUserOtpByFieldName(fieldObject: object) { 
    return this.userotpRepository.findOneBy(fieldObject);
  }


  async findUserOtp(userId: number) {
    return this.userotpRepository.find({
      where: [
        {
          user_id: userId,
        }
      ],
      order: {
        created_at: 'DESC'
      }
    });
    
  }
}
