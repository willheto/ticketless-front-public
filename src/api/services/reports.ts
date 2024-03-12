import axiosInstance from '../axiosInstance';

class ReportService {
	reportUser = async (data: ReportInterface) => {
		const response = await axiosInstance.post(`users/report`, data);
		return response;
	};
}

const reports = new ReportService();

export default reports;
