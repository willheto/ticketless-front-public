import BaseService from './base';
import axiosInstance from '../axiosInstance';

class AdvertisementsService extends BaseService<AdvertisementInterface> {
	getAllActive = async () => {
		const response = await axiosInstance.get('advertisements/active');
		// @ts-expect-error
		return response.advertisements;
	};
	updateClick = async (advertisementID: number) => {
		axiosInstance.post(`advertisements/${advertisementID}/click`);
	};
	updateView = async (advertisementID: number) => {
		axiosInstance.post(`advertisements/${advertisementID}/view`);
	};
}

const advertisements = new AdvertisementsService({
	serviceURL: `advertisements`,
	keyParameter: 'advertisementID',
	crudResponseObject: 'advertisement',
});

export default advertisements;
