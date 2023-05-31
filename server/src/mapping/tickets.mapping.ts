import {type Ticket, type TicketWithoutId} from '../common/types/tickets.types';
import TicketEntity from '../entities/tickets.entity.js';

export function mapTicketToTicketEntity(ticket: TicketWithoutId): TicketEntity {
    const ticketEntity = new TicketEntity();

    if (ticket.id !== undefined) {
        ticketEntity.id = ticket.id;
    }

    ticketEntity.title = ticket.title;
    ticketEntity.from = ticket.from;
    ticketEntity.insertURL = ticket.insertURL;
    ticketEntity.text = ticket.text;
    ticketEntity.status = ticket.status;
    ticketEntity.userId = ticket.userId;

    return ticketEntity;
}

export function mapTicketEntityToTicket(ticketEntity: TicketEntity): Ticket {
    return {
        id: ticketEntity.id,
        title: ticketEntity.title,
        from: ticketEntity.from,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: ticketEntity.insertURL,
        status: ticketEntity.status,
        text: ticketEntity.text,
        userId: ticketEntity.userId,
    };
}
