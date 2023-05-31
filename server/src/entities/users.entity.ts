import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {TicketEntity} from './tickets.entity.js';
import {TicketAnswerEntity} from './tickets-ans.entity.js';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_User'})
        id = 0;

    @Column({type: 'text', unique: true})
        username = '';

    @Column('text', {nullable: true})
        firstName?: string | null;

    @Column('text', {nullable: true})
        lastName?: string | null;

    @Column({type: 'text', unique: true})
        email = '';

    @Column('text')
        password = '';

    @Column({type: 'text', nullable: true})
        token?: string | null;

    @OneToMany(() => TicketEntity, ticket => ticket.user)
        tickets?: TicketEntity[];

    @OneToMany(() => TicketAnswerEntity, answer => answer.user)
        answers?: TicketAnswerEntity[];
}

export default UserEntity;
