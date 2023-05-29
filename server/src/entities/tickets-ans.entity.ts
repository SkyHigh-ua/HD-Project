import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import {UserEntity} from './users.entity'
import {TicketEntity} from './tickets.entity'

@Entity('TicketAnswer')
export class TicketAnswerEntity {
    @PrimaryGeneratedColumn()
        id: number = 0;

    @Column('text')
        text: string = '';

    @Column('json')
        insertURL: string[] = [];

    @Column('integer')
        ticketId?: number;
    
    @Column('integer')
        userId?: number;

    @ManyToOne(() => UserEntity, user => user.tickets)
    @JoinColumn({ name: 'userId' })
        user?: UserEntity;
    
    @OneToOne(() => TicketEntity, ticket => ticket.answer)
    @JoinColumn({ name: 'ticketId' })
        ticket?: TicketEntity;
}

export default TicketAnswerEntity;
