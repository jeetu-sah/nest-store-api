import { Column, 
   CreateDateColumn, 
   DeleteDateColumn, 
   Entity, 
   PrimaryGeneratedColumn 
   } from "typeorm";


@Entity()
export class Category {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   categoryName: string;

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

   @Column()
   parent_id: number;
}