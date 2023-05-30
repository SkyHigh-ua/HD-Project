import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import {TicketEntity} from './tickets.entity.js';
import {TicketAnswerEntity} from './tickets-ans.entity.js';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_User'})
        id: number = 0;

    @Column({type: 'text', unique: true})
        username: string = '';

    @Column('text')
        firstName?: string = '';

    @Column('text')
        lastName?: string = '';

    @Column({type: 'text', unique: true})
        email: string = '';

    @Column('text')
        password: string = '';

    @Column({type: 'text', nullable: true})
        token?: string;

    @OneToMany(() => TicketEntity, ticket => ticket.user)
    @JoinColumn({name: 'id', referencedColumnName: 'userId'})
        tickets?: TicketEntity[];

    @OneToMany(() => TicketAnswerEntity, answer => answer.user)
    @JoinColumn({name: 'id', referencedColumnName: 'userId'})
        answers?: TicketAnswerEntity[];
}

export default UserEntity;
