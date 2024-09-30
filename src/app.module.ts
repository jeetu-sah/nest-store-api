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
import { UserotpController } from './userotp/userotp.controller';
import { UserotpService } from './userotp/userotp.service';
import { UserotpModule } from './userotp/userotp.module';
import { userOtp } from './userotp/userotp.entity';
import { Product } from './product/product.entity';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity'; 


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_database',
      entities: [User,Admin,userOtp, Product, Category],
      synchronize: true,
    }),
    UserotpModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController, UserController, AdminController, UserotpController, ProductController, CategoryController],
  providers: [AppService, UserService, AdminService, UserotpService, ProductService, CategoryService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
