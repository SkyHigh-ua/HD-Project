import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import {UserEntity} from './users.entity.js';
import {TicketEntity} from './tickets.entity.js';

@Entity('TicketAnswer')
export class TicketAnswerEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_TicketAnswer'})
        id = 0;

    @Column('text')
        text = '';

    @Column('json')
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: string[] = [];

    @Column('integer', {nullable: true})
        ticketId?: number | null;

    @Column('integer', {nullable: true})
        userId?: number | null;

    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
        answerDate: Date = new Date();

    @ManyToOne(() => UserEntity, user => user.answers)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
        user?: UserEntity;

    @OneToOne(() => TicketEntity, ticket => ticket.answer)
    @JoinColumn({name: 'ticketId', referencedColumnName: 'id'})
        ticket?: TicketEntity;
}

export default TicketAnswerEntity;
