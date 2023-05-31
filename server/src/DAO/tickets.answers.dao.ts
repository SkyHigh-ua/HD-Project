import dbCommon from '../common/db.common.js';
import TicketAnswerEntity from '../entities/tickets-ans.entity.js';
import {type PartialTicketAnswer} from '../common/types/tickets.answers.types.js';
import connection from '../datasource/db.datasource.js';
import * as ticketsDao from './tickets.dao.js';

export async function findAnswerById(id: number) {
    try {
        const result = await dbCommon.entityManager.findOne(TicketAnswerEntity, {
            where: {id},
        });

        return result ? result : undefined;
    } catch (err) {
        console.log('Error occurred while finding answer by ID:', err);
        throw err;
    }
}

export async function findAllAnswers(
    filter?: PartialTicketAnswer,
    page?: number,
    limit?: number,
) {
    const query
        = connection.createQueryBuilder(TicketAnswerEntity, 'TicketAnswer');

    if (filter?.text) {
        query.andWhere('TicketAnswer.text LIKE :text', {text: `%${filter.text}%`});
    }

    if (filter?.ticketId) {
        query.andWhere('TicketAnswer.ticketId = :ticketId', {ticketId: filter.ticketId});
    }

    if (filter?.insertURL && filter.insertURL.length > 0) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query.andWhere('TicketAnswer.insertURL @> :insertURL', {insertURL: filter.insertURL});
    }

    if (filter?.userId) {
        query.andWhere('TicketAnswer.userId = :userId', {userId: filter.userId});
    }

    if (filter?.answerDate) {
        query.andWhere('DATE(TicketAnswer.answerDate) = :date', {date: filter.answerDate});
    }

    if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
    }

    console.log('trial to get answers');
    return query.getMany();
}

export async function createAnswer(answer: TicketAnswerEntity) {
    const ticketToBeAnswered = await ticketsDao.findTicketById(answer.ticketId!);

    if (!ticketToBeAnswered) {
        throw new Error(`Ticket with ID ${answer.ticketId!} doesn't exist`);
    }

    if (ticketToBeAnswered.status === 'Solved' || ticketToBeAnswered.status === 'Closed') {
        throw new Error(`Ticket with ID ${answer.ticketId!} is already answered`);
    }

    ticketToBeAnswered.status = 'Solved';
    await ticketsDao.updateTicket(ticketToBeAnswered);

    const createdAnswer = dbCommon.entityManager.create(TicketAnswerEntity, answer);

    return dbCommon.entityManager.save(createdAnswer);
}

export async function updateAnswer(answer: TicketAnswerEntity) {
    const existingAnswer = await findAnswerById(answer.id);

    if (!existingAnswer) {
        throw new Error(`Answer with ID ${answer.id} does not exist.`);
    }

    existingAnswer.ticketId = answer.ticketId;
    existingAnswer.userId = answer.userId;
    existingAnswer.text = answer.text;
    existingAnswer.insertURL = answer.insertURL;
    existingAnswer.answerDate = answer.answerDate;

    return dbCommon.entityManager.save(existingAnswer);
}

export async function deleteAnswer(answerId: number) {
    const answerToDelete = await findAnswerById(answerId);

    if (!answerToDelete) {
        throw new Error(`Answer with ID ${answerId} does not exist.`);
    }

    await dbCommon.entityManager.remove(answerToDelete);
}
