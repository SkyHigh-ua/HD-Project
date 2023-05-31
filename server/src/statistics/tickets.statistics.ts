import moment from 'moment';
import * as Dao from '../DAO/tickets.answers.dao.js';
import {mapTicketAnswerEntityToTicketAnswer} from '../mapping/tickets.answers.mapping.js';
import {type TicketAnswer} from '../common/types/tickets.answers.types.js';

export async function getAnswersStatisticsAcrossMonths(): Promise<Record<string, number>> {
    const answeredTicketsEntities = await Dao.findAllAnswers();
    const answeredTickets = answeredTicketsEntities.map(value =>
        mapTicketAnswerEntityToTicketAnswer(value)) as TicketAnswer[];

    const ticketsStatistics: Record<string, number> = {};

    answeredTickets.forEach(answer => {
        const month = moment(answer.answerDate).format('MM') as string;

        if (ticketsStatistics[month]) {
            ticketsStatistics[month]++;
        } else {
            ticketsStatistics[month] = 1;
        }
    });

    return ticketsStatistics;
}
