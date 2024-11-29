import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "../category/category.entity"

@Entity({name:"product_category"})

export class ProductCategory{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    updated_at: Date;
  
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  
    @Column({ default: true })
    isActive: boolean;


    // @ManyToOne(
    //     () => Product,
    //     product => product.categories,
    //     {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    //   )
    //   @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
    //   products: Product[];
    
    //   @ManyToOne(
    //     () => Category,
    //     category => category.products,
    //     {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    //   )
    //   @JoinColumn([{ name: 'course_id', referencedColumnName: 'id' }])
    //   category: Category[];
    
}