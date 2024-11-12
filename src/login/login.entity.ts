import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Login{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:String;
    
    @Column()
    password:String;

    @Column({ type: 'timestamp' })
    updated_at: Date;
  
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
  
    @DeleteDateColumn()  
    deleted_at: Date;


}