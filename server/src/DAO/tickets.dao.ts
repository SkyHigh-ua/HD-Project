import dbCommon from '../common/db.common.js';
import {TicketEntity} from '../entities/tickets.entity.js';
import {type FindManyOptions} from 'typeorm';

export async function findTicketById(id: number) {
    try {
        const result = await dbCommon.entityManager.findOne(TicketEntity, {
            where: {id},
        });

        return result ? result : undefined;
    } catch (err) {
        console.log('Error occurred while finding ticket by ID:', err);
        throw err;
    }
}

export async function findAllTickets(
    filter?: FindManyOptions<TicketEntity>,
    page?: number,
    limit?: number,
) {
    const options: FindManyOptions<TicketEntity> = {
        ...filter,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
    };

    return dbCommon.entityManager.find(TicketEntity, options);
}

export async function createTicket(ticket: TicketEntity) {
    const createdTicket = dbCommon.entityManager.create(TicketEntity, ticket);

    return dbCommon.entityManager.save(createdTicket);
}

export async function updateTicket(ticket: TicketEntity) {
    const existingTicket = await findTicketById(ticket.id);

    if (!existingTicket) {
        throw new Error(`Ticket with ID ${ticket.id} does not exist.`);
    }

    existingTicket.id = ticket.id;
    existingTicket.title = ticket.title;
    existingTicket.from = ticket.from;
    existingTicket.text = ticket.text;
    existingTicket.insertURL = ticket.insertURL;
    existingTicket.status = ticket.status;

    return dbCommon.entityManager.save(existingTicket);
}

export async function deleteTicket(ticketId: number) {
    const ticketToDelete = await findTicketById(ticketId);

    if (!ticketToDelete) {
        throw new Error(`Ticket with ID ${ticketId} does not exist.`);
    }

    await dbCommon.entityManager.remove(ticketToDelete);
}
