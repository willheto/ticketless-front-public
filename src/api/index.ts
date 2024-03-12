import * as auth from './services/auth';
import tickets from './services/tickets';
import events from './services/events';
import users from './services/users';
import chats from './services/chats';
import messages from './services/messages';
import locations from './services/locations';
import reports from './services/reports';
import push from './services/push';
import advertisements from './services/advertisements';

const api = {
	auth,
	tickets,
	events,
	users,
	chats,
	messages,
	locations,
	reports,
	push,
	advertisements,
};

export default api;
