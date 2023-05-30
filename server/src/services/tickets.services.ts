import {type FindManyOptions} from 'typeorm';
import * as Dao from '../DAO/tickets.dao.js';
import HttpError from '../common/error.class.js';
import type TicketEntity from '../entities/tickets.entity.js';
import {mapTicketEntityToTicket, mapTicketToTicketEntity} from '../mapping/tickets.mapping.js';
import {type PartialTicket, type Ticket, type TicketWithoutId} from '../common/tickets.types';

export async function get(
    ticketId?: number,
    filter?: FindManyOptions<TicketEntity>,
    page?: number,
    limit?: number,
) {
    if (ticketId) {
        const ticket = await Dao.findTicketById(ticketId);

        if (!ticket) {
            throw new HttpError(`User with id ${ticketId} not found`, 404);
        }

        return mapTicketEntityToTicket(ticket);
    }

    const tickets = await Dao.findAllTickets(filter, page, limit);

    return tickets.map(value => mapTicketEntityToTicket(value));
}

export async function create(ticket: TicketWithoutId) {
    const ticketEntity = mapTicketToTicketEntity(ticket);
    const createdTicket = await Dao.createTicket(ticketEntity);

    return mapTicketEntityToTicket(createdTicket);
}

export async function update(ticketId: number, ticket: PartialTicket) {
    const oldTicketEntity = await Dao.findTicketById(ticketId);

    if (!oldTicketEntity) {
        throw new HttpError(`Ticket with id ${ticketId} not found`, 404);
    }

    const oldTicket = mapTicketEntityToTicket(oldTicketEntity);

    const updatedData: Ticket = {
        id: ticketId,
        title: ticket.title ? ticket.title : oldTicket.title,
        from: ticket.from ? ticket.from : oldTicket.from,
        text: ticket.text ? ticket.text : oldTicket.text,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: ticket.insertURL ? ticket.insertURL : oldTicket.insertURL,
        status: ticket.status ? ticket.status : oldTicket.status,
    };

    const updatedTicket = await Dao.updateTicket(mapTicketToTicketEntity(updatedData));

    return mapTicketEntityToTicket(updatedTicket);
}

export async function remove(ticketId: number) {
    const existedTicket = await Dao.findTicketById(ticketId);

    if (!existedTicket) {
        throw new HttpError(`Ticket with id ${ticketId} not found`, 404);
    }

    await Dao.deleteTicket(ticketId);

    return 'Ticket deleted';
}
