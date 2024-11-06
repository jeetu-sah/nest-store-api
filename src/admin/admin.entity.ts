
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @DeleteDateColumn()  
  deleted_at: Date;
}