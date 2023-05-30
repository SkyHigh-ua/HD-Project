import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import {UserEntity} from './users.entity.js';
import {TicketAnswerEntity} from './tickets-ans.entity.js';

@Entity('Ticket')
export class TicketEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_Ticket'})
        id = 0;

    @Column({type: 'text'})
        title = '';

    @Column('text')
        from = 'undefined';

    @Column('text')
        text = '';

    @Column('json')
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: string[] = [];

    @Column('text')
        status = 'available';

    @Column('integer')
        userId?: number;

    @ManyToOne(() => UserEntity, user => user.tickets)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
        user?: UserEntity;

    @OneToOne(() => TicketAnswerEntity, answer => answer.ticket)
    @JoinColumn({name: 'id', referencedColumnName: 'ticketId'})
        answer?: TicketAnswerEntity;
}

export default TicketEntity;
