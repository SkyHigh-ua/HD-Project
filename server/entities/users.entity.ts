import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column({type: 'text', nullable: true})
  token?: string;
}