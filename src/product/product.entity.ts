import { IsNotEmpty, IsNumber, ValidatorOptions } from "@nestjs/class-validator";
import { ValidationError } from "@nestjs/common";
// import { Type } from "class-transformer";
import { Category } from "../category/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";



@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;


  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: "decimal" })
  discountPrice: number;

  @Column({ type: "text" })
  slugName: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  category_Id: number;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: true })
  isActive: boolean;

  // @ManyToOne(() => Category, (category) => category.parent_id)
  //   user: Category
}