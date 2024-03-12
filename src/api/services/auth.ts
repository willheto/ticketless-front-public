import axiosInstance from '../axiosInstance';

export const login = async (email: string, password: string) => {
	try {
		if (!email || !password) {
			throw {
				details: 'Missing parameters, check posted data.',
			};
		}

		let url = `${API_BASE_URL}/user/login`;

		let payload = {
			email,
			password,
		};
		let options = {
			timeout: 60000,
		};

		// Make API call
		const response = await axiosInstance.post(url, payload, options);

		// Validate response
		// @ts-expect-error
		if (!response?.token) {
			throw {
				details: 'Invalid response from the server.',
			};
		}

		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const logout = async () => {
	try {
		// remove token from local storage
		localStorage.removeItem('ticketlessAuthToken');
	} catch (error) {
		console.log(error);
	}
};

interface RegisterProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export const register = async (payload: RegisterProps) => {
	const { email, password, firstName, lastName } = payload;
	if (!email || !password || !firstName || !lastName) {
		throw {
			details: 'Missing parameters, check posted data.',
		};
	}

	let url = `${API_BASE_URL}/users`;

	let options = {
		timeout: 60000,
	};

	// Make API call
	const response = await axiosInstance.post(url, payload, options);

	return response;
};

export const checkPassword = async (payload: {
	userID: number;
	password: string;
}) => {
	const { userID, password } = payload;
	if (!userID || !password) {
		throw {
			details: 'Missing parameters, check posted data.',
		};
	}

	let url = `${API_BASE_URL}/users/check-password`;

	let options = {
		timeout: 60000,
	};

	// Make API call
	return axiosInstance.post(url, { userID, password }, options);
};

export const forgotPassword = async (payload: { email: string }) => {
	const { email } = payload;
	if (!email) {
		throw {
			details: 'Missing parameters, check posted data.',
		};
	}

	let url = `${API_BASE_URL}/users/forgot-password`;

	let options = {
		timeout: 60000,
	};

	// Make API call
	return axiosInstance.post(url, { email }, options);
};

export const checkCode = async (payload: { code: string }) => {
	const { code } = payload;
	if (!code) {
		throw {
			details: 'Missing parameters, check posted data.',
		};
	}

	let url = `${API_BASE_URL}/users/check-code`;

	let options = {
		timeout: 60000,
	};

	// Make API call
	return axiosInstance.post(url, { code }, options);
};
