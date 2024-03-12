import BaseService from './base';
import axiosInstance from '../axiosInstance';

const INVALID_RESPONSE = { details: 'Invalid response from the server.' };

class messagesService extends BaseService<MessageInterface> {
	async getAllByChatID(chatID: number) {
		// Make API call
		const url = `${API_BASE_URL}/chats/${chatID}/${this.serviceURL}`;
		const response = await this.makeGetRequest(url);
		// Type guard for response.
		if (typeof response !== 'object') {
			throw INVALID_RESPONSE;
		} else if (this.crudResponseArray in response === false) {
			console.error(
				`[BaseService] object returned from API does not contain ${this.crudResponseArray} property.`,
			);
			throw {
				...INVALID_RESPONSE,
				details: `Failed to fetch ${this.crudResponseArray}. Invalid response from the server.`,
			};
		}

		return response[this.crudResponseArray];
	}

	createMessage = async (
		data: object,
		chatID: number,
		callback?: (_response) => void,
	): Promise<any> => {
		if (typeof this.beforeCreate === 'function') {
			data = this.beforeCreate(data);
		}
		const url = `${API_BASE_URL}/${this.serviceURL}`;
		// Make API call
		const response = await axiosInstance.post(url, data);

		if (!response) {
			if (
				!response ||
				(this.crudResponseObject && !response[this.crudResponseObject])
			) {
				throw INVALID_RESPONSE;
			}
		}
		if (typeof callback === 'function') {
			try {
				callback(response[this.crudResponseObject]);
			} catch (error) {
				console.log(`Delete callback failed.`, error);
			}
		}

		return response;
	};

	/**
	 * @name update
	 * @desc Set all messages in a chat to read.
	 * @param {object} data
	 * @returns {object}
	 */
	setMessagesRead = async (data: any): Promise<any> => {
		const id = data[this.keyParameter];
		if (!id) {
			throw { details: `Missing ${this.keyParameter}` };
		}
		if (typeof this.beforePatch === 'function') {
			data = this.beforePatch(data);
		}
		const url = `${API_BASE_URL}/chats/${id}/${this.serviceURL}`;
		const response = await axiosInstance.patch(url, data);

		if (!response) {
			throw INVALID_RESPONSE;
		}

		return response;
	};

	/**
	 * @name get
	 * @desc Check for unread messages.
	 * @returns {object}
	 */
	hasUnreadMessages = async () => {
		const url = `${API_BASE_URL}/messages/unread-messages`;
		const response = await axiosInstance.get(url);

		if (!response) {
			throw INVALID_RESPONSE;
		}
		return response;
	};
}

const messages = new messagesService({
	serviceURL: `messages`,
	keyParameter: 'chatID',
	crudResponseObject: 'message',
});

export default messages;
