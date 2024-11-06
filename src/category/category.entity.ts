import { Product } from "../product/product.entity";
import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn
} from "typeorm";


@Entity('category')
export class Category {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   description: string;

   @Column()
   slugname: string;

   @Column({ type: 'timestamp' })
   updated_at: Date;

   @CreateDateColumn({ type: 'datetime' })
   created_at: Date;

   @DeleteDateColumn()
   deleted_at: Date;


   @Column({ default: true })
   isActive: boolean;

  


   @ManyToOne(() => Category, (category) => category.subcategories,  { onDelete: 'CASCADE' })
   parent_id: Category;

   @OneToMany(() => Category, (category) => category.parent_id)
   subcategories: Category[];
}
