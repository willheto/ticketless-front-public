import BaseService from './base';

class ChatsService extends BaseService<ChatDataInterface> {}

const chats = new ChatsService({
	serviceURL: `chats`,
	keyParameter: 'chatID',
	crudResponseObject: 'chat',
});

export default chats;
