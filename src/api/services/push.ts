import axiosInstance from '../axiosInstance';
declare const API_BASE_URL: string;

interface PushNotificationInterface {
	senderName: string;
	senderID: number;
	receiverID: number;
	content: string;
	chatID: number;
	baseUrl: string;
}

interface RegisterProps {
	subscription: PushSubscription;
	userID: number;
}

class PushService {
	async sendPushNotification(data: PushNotificationInterface): Promise<any> {
		try {
			const url = `${API_BASE_URL}/push-api/send-notification`;
			return axiosInstance.post(url, data);
		} catch (error) {
			return error;
		}
	}

	async register(data: RegisterProps): Promise<any> {
		try {
			const url = `${API_BASE_URL}/push-api/register`;
			return axiosInstance.post(url, data);
		} catch (error) {
			return error;
		}
	}

	async unregister(data: { subscription: PushSubscription }): Promise<any> {
		try {
			const url = `${API_BASE_URL}/push-api/unregister`;
			return axiosInstance.post(url, data);
		} catch (error) {
			return error;
		}
	}

	async getVapidPublicKey(): Promise<any> {
		try {
			const url = `${API_BASE_URL}/push-api/vapid-public-key`;
			return axiosInstance.get(url);
		} catch (error) {
			return error;
		}
	}
}

const events = new PushService();

export default events;
