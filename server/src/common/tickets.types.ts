import {type DeepPartial} from 'typeorm';

export type Ticket = {
    id: number;
    title: string;
    from: string;
    text: string;
    insertURL: string[];
    status: string;
};

export type TicketWithoutId = {id?: number} & Omit<Ticket, 'id'>;

export type PartialTicket = DeepPartial<Ticket>;
