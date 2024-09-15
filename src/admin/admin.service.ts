import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminService {
  private adminRepository;

  constructor(private dataSource: DataSource) {
    this.adminRepository = this.dataSource.getRepository(Admin);
  }

  find(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findAll(): string {
    return 'return all users details  !';
  }

  async create(admin: Partial<Admin>): Promise<Admin> {
    const newuser = this.adminRepository.create(admin);
    return this.adminRepository.save(newuser);
  }

  async delete(id: number) {
    // return "test in services" 
    return this.adminRepository.delete(id);
  }

  async details(id: number) {
    // return "test in services" 
    return this.adminRepository.findOneBy({ id });
  }
  async update(admin) {
    // return "test in services" 
    return this.adminRepository.save(admin);
  }
}
