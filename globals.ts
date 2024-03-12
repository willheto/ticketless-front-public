const setupAPI = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return '192.168.33.10';
		case 'development':
			return 'https://dev-api.ticketless.fi';
		case 'production':
			return 'https://api.ticketless.fi';
		default:
			return '192.168.33.10';
	}
};

const setupWebsocket = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return '192.168.33.10:3000';
		case 'development':
			return 'https://dev-socket.ticketless.fi';
		case 'production':
			return 'https://socket.ticketless.fi';
		default:
			return '192.168.33.10:3000';
	}
};

const API_BASE_URL = JSON.stringify(setupAPI());
const WEBSOCKET_URL = JSON.stringify(setupWebsocket());
export default {
	API_BASE_URL,
	WEBSOCKET_URL,
};
