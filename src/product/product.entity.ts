
// import { Type } from "class-transformer";
import { Category } from "../category/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";



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

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ default: true })
  isActive: boolean;


  @ManyToMany(() => Category, (category) => category.products)
@JoinTable({
    name: 'product_category', // Table name for the many-to-many relationship
    joinColumn: {
        name: 'product_id', // Column for the Product reference
        referencedColumnName: 'id', // Product primary key column
        foreignKeyConstraintName:"product_category_product_id"
    },
    inverseJoinColumn: {
        name: 'category_id', // Column for the Category reference
        referencedColumnName: 'id', // Category primary key column
        foreignKeyConstraintName:"product_category_category_id"

    },
})
categories: Category[];





}