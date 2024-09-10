import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AdminController } from './admin/admin.controller';
import { Admin } from './admin/admin.entity';
import { AdminService } from './admin/admin.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_database',
      entities: [User,Admin],
      synchronize: true,
    })
  ],
  controllers: [AppController, UserController, AdminController],
  providers: [AppService, UserService, AdminService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
