import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({type: 'bigint'})
  mobile: number;

  @Column()
  password: string;

  @Column()
  maritalStatus: string;

  @Column({ type: 'date', nullable: true })
  DOB: Date | null;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column({ type: 'char', length: 3 })
  bloodGroup: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  height: number;

  @Column()
  higestQualification: string;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @DeleteDateColumn()  
  deleted_at: Date;

  @Column({ default: true })
  isActive: boolean;
}