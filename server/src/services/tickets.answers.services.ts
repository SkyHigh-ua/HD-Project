import {
    type PartialTicketAnswer,
    type TicketAnswer,
    type TicketAnswerWithoutId,
} from '../common/types/tickets.answers.types.js';
import * as Dao from '../DAO/tickets.answers.dao.js';
import HttpError from '../common/error.class.js';
import {
    mapTicketAnswerEntityToTicketAnswer,
    mapTicketAnswerToTicketAnswerEntity,
} from '../mapping/tickets.answers.mapping.js';

export async function get(
    answerId?: number,
    filter?: PartialTicketAnswer,
    page?: number,
    limit?: number,
) {
    if (answerId) {
        const answer = await Dao.findAnswerById(answerId);

        if (!answer) {
            throw new HttpError(`Answer with id ${answerId} not found`, 404);
        }

        return mapTicketAnswerEntityToTicketAnswer(answer);
    }

    const answers = await Dao.findAllAnswers(filter, page, limit);

    return answers.map(value => mapTicketAnswerEntityToTicketAnswer(value));
}

export async function create(answer: TicketAnswerWithoutId) {
    const answerEntity = mapTicketAnswerToTicketAnswerEntity(answer);
    const createdAnswer = await Dao.createAnswer(answerEntity);

    return mapTicketAnswerEntityToTicketAnswer(createdAnswer);
}

export async function update(answerId: number, answer: PartialTicketAnswer) {
    const oldAnswerEntity = await Dao.findAnswerById(answerId);

    if (!oldAnswerEntity) {
        throw new HttpError(`Answer with id ${answerId} not found`, 404);
    }

    const oldAnswer = mapTicketAnswerEntityToTicketAnswer(oldAnswerEntity);

    const updatedData: TicketAnswer = {
        id: answerId,
        text: answer.text ? answer.text : oldAnswer.text,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: answer.insertURL ? answer.insertURL : oldAnswer.insertURL,
        ticketId: answer.ticketId ? answer.ticketId : null,
        userId: answer.userId ? answer.userId : null,
    };

    const updatedAnswer = await Dao.updateAnswer(mapTicketAnswerToTicketAnswerEntity(updatedData));

    return mapTicketAnswerEntityToTicketAnswer(updatedAnswer);
}

export async function remove(answerId: number) {
    const existedAnswer = await Dao.findAnswerById(answerId);

    if (!existedAnswer) {
        throw new HttpError(`Answer with id ${answerId} not found`, 404);
    }

    await Dao.deleteAnswer(answerId);

    return 'Answer deleted';
}
