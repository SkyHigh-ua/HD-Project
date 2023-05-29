import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import {UserEntity} from './users.entity'
import {TicketAnswerEntity} from './tickets-ans.entity'

@Entity('Ticket')
export class TicketEntity {
    @PrimaryGeneratedColumn()
        id: number = 0;

    @Column({type: 'text'})
        title: string = '';

    @Column('text')
        from: string = 'underfined';

    @Column('text')
        text: string = '';

    @Column('json')
        insertURL: string[] = [];

    @Column('text')
        status: string = 'available';

    @Column('integer')
        userId?: number;

    @ManyToOne(() => UserEntity, user => user.tickets)
    @JoinColumn({ name: 'userId' })
        user?: UserEntity;
    
    @OneToOne(() => TicketAnswerEntity, answer => answer.ticket)
    @JoinColumn({ name: 'id', referencedColumnName: 'ticketId' })
        answer?: TicketAnswerEntity;
}

export default TicketEntity;
