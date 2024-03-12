import React, { useEffect, useState } from 'react';
import App from '@src/components/app/App';
import { Button, Form } from 'react-bootstrap';
import { UserProvider } from '@src/context/UserContext';

const Root = (): JSX.Element => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);

	const handleLogin = (): void => {
		if (username === 'admin' && password === 'Lyölampista!') {
			setIsAuthenticated(true);
			localStorage.setItem('devToken', 'qwerfvcxzasdfghjkl');
		} else {
			setIsPasswordWrong(true);
		}
	};

	const handleUsernameChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setUsername(e.target.value);
	};

	useEffect(() => {
		const token = localStorage.getItem('devToken');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	if (process.env.NODE_ENV === 'development') {
		if (!isAuthenticated) {
			return (
				<div className="d-flex justify-content-center h-100">
					<div>
						<h3>Dev Login</h3>
						<Form.Label>Username</Form.Label>
						<Form.Control
							value={username}
							onChange={handleUsernameChange}
						/>
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							type="password"
							onChange={e => setPassword(e.target.value)}
						/>
						<Button
							onClick={() => handleLogin()}
							className="mt-2 btn-pink"
						>
							Login
						</Button>
						{isPasswordWrong && (
							<p className="text-danger">
								Wrong username or password
							</p>
						)}
					</div>
				</div>
			);
		} else {
			return (
				<UserProvider defaultUser={null}>
					<App />
				</UserProvider>
			);
		}
	} else {
		return (
			<UserProvider defaultUser={null}>
				<App />
			</UserProvider>
		);
	}
};

export default Root;
