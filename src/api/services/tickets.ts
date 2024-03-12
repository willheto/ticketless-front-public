import BaseService from './base';

class TicketsService extends BaseService<TicketInterface> {
	// own methods here
}

const tickets = new TicketsService({
	serviceURL: `tickets`,
	keyParameter: 'ticketID',
	crudResponseObject: 'ticket',
});

export default tickets;
