import {type TicketAnswerWithoutId} from '../common/types/tickets.answers.types.js';
import TicketAnswerEntity from '../entities/tickets-ans.entity.js';

export function mapTicketAnswerToTicketAnswerEntity(answer: TicketAnswerWithoutId) {
    const answerEntity = new TicketAnswerEntity();

    if (answer.id !== undefined) {
        answerEntity.id = answer.id;
    }

    answerEntity.ticketId = answer.ticketId;
    answerEntity.insertURL = answer.insertURL;
    answerEntity.text = answer.text;
    answerEntity.userId = answer.userId;

    return answerEntity;
}

export function mapTicketAnswerEntityToTicketAnswer(answerEntity: TicketAnswerEntity) {
    return {
        id: answerEntity.id,
        ticketId: answerEntity.ticketId,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        insertURL: answerEntity.insertURL,
        text: answerEntity.text,
        userId: answerEntity.userId,
    };
}
