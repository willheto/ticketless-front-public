import BaseService from './base';

class UsersService extends BaseService<UserInterface> {}

const users = new UsersService({
	serviceURL: `users`,
	keyParameter: 'userID',
	crudResponseObject: 'user',
});

export default users;
