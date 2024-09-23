
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class userOtp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  otp: number;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @Column({ default: true })
  isActive: boolean;
}
