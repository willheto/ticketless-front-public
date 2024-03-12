import BaseService from './base';
import axiosInstance from '../axiosInstance';

class EventsService extends BaseService<EventInterface> {
	getEventByTicketID = async (ticketID: number) => {
		const response = await axiosInstance.get(`tickets/${ticketID}/event`);
		return response;
	};
}

const events = new EventsService({
	serviceURL: `events`,
	keyParameter: 'eventID',
	crudResponseObject: 'event',
});

export default events;
