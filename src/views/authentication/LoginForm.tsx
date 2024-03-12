import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import api from '@src/api';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import logo_vari from '@src/assets/logo_vari_cropped.svg';
import ForgotPassword from './ForgotPassword';
import { urlBase64ToUint8Array } from '@src/utils/base64';
import { PrivacyPolicyContent } from '../profile/termsAndPolicies/PrivacyPolicy';
import { useTranslation } from 'react-i18next';
import { TermsContent } from '../profile/termsAndPolicies/Terms';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { useUser } from '@src/context/UserContext';
import View from '@src/components/layout/View';

interface LoginFormInputs {
	email: string;
	password: string;
}

const LoginForm = (): JSX.Element => {
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
	const { t } = useTranslation();
	const [showTerms, setShowTerms] = useState<boolean>(false);
	const { setUser, user } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const updateServiceWorker = (): void => {
		// Get the ServiceWorkerRegistration for this scope
		navigator.serviceWorker.getRegistration().then(function (registration) {
			if (!registration) return;
			registration.update().then(function () {
				console.log('Service worker updated');
			});
		});
	};

	const setTokenToLocalStorage = (token: string): void => {
		localStorage.setItem('ticketlessAuthToken', token);
	};

	const onSubmit = async (data: LoginFormInputs): Promise<void> => {
		try {
			setIsLoggingIn(true);
			const response = await api.auth.login(data.email, data.password);

			setIsLoggingIn(false);

			if (response?.user) {
				setUser(response.user);
				setTokenToLocalStorage(response.token);
				i18n.changeLanguage(response.user.language);
				navigate('/profile');
			} else if (response.error) {
				setError(response.error);
			} else if (
				response === 'Too many requests, please try again later.'
			) {
				setError(response);
			}

			if (response?.user) {
				registerUser(response.user);
			}
			// Get the ServiceWorkerRegistration for this scope
			updateServiceWorker();
		} catch (error) {
			setError(error);
			setIsLoggingIn(false);
		}
	};

	const registerUser = async (user: UserInterface): Promise<void> => {
		try {
			const registration = await navigator.serviceWorker.ready;
			let subscription = await registration.pushManager.getSubscription();

			if (!subscription) {
				const response = await api.push.getVapidPublicKey();
				const vapidPublicKey = response.publicKey;
				const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

				subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedVapidKey,
				});
			}

			const requestBody = {
				subscription,
				userID: user?.userID,
			};

			await api.push.register(requestBody);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View
			topBarProps={{
				header: user ? t('profile.profile') : t('general.login'),
				allowBack: false,
			}}
		>
			<Modal
				show={showEditModal}
				onHide={() => setShowEditModal(false)}
				centered
			>
				<ForgotPassword onSuccess={() => setShowEditModal(false)} />
			</Modal>
			<Modal
				show={showPrivacyPolicy}
				onHide={() => setShowPrivacyPolicy(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>{t('profile.privacyPolicy')}</Modal.Title>
				</Modal.Header>
				<PrivacyPolicyContent />
			</Modal>
			<Modal show={showTerms} onHide={() => setShowTerms(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t('profile.terms')}</Modal.Title>
				</Modal.Header>
				<TermsContent />
			</Modal>
			<Form
				className="p-3 pt-0 d-flex h-100 flex-column overflow-auto justify-content-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Form.Group className="d-flex justify-content-center">
					<img
						className="w-100 mb-3"
						style={{ maxWidth: '200px' }}
						src={logo_vari}
					/>
				</Form.Group>
				<Form.Group className="text-center">
					<h3>{t('profile.welcomeBack')}</h3>
				</Form.Group>
				<div>
					<Form.Group className="mt-4">
						<Form.Label>{t('general.email')}</Form.Label>
						<Form.Control
							type="email"
							{...register('email', {
								required: t('profile.emailRequired'),
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="email"
							render={({ message }) => (
								<p className="text-danger">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Label>{t('profile.password')}</Form.Label>
						<Form.Control
							type="password"
							{...register('password', {
								required: t('profile.passwordRequired'),
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ message }) => (
								<p className="text-danger">{message}</p>
							)}
						/>
						<Form.Group className="d-flex justify-content-end">
							<span
								style={{
									color: '#f24594',
									textDecoration: 'underline',
								}}
								onClick={() => setShowEditModal(true)}
							>
								{t('general.forgotPassword')}
							</span>
						</Form.Group>
					</Form.Group>

					{error && (
						<p className="text-danger">
							{error === 'Invalid credentials'
								? t('profile.wrongPasswordOrEmail')
								: error === 'Missing email or password'
									? t('profile.emailOrPasswordMissing')
									: error ===
										  'Too many requests, please try again later.'
										? t('profile.tooManyAttempts')
										: t('profile.loginError')}
						</p>
					)}
					<Form.Group className="mt-4 d-flex justify-content-center">
						<Button
							className="w-100 text-center btn-pink"
							type="submit"
							disabled={isLoggingIn}
						>
							{!isLoggingIn
								? t('general.login')
								: t('general.loggingIn')}
						</Button>
					</Form.Group>
					<div className="d-flex justify-content-center align-items-center gap-2 my-1">
						<hr className="w-50" />
						{t('profile.or')} <hr className="w-50" />
					</div>
					<Form.Group className="d-flex justify-content-center">
						<Button
							className="w-100 text-center btn-pink"
							style={{
								backgroundColor: 'white',
								color: '#f24594',
							}}
							onClick={() => navigate('/register')}
						>
							{t('profile.register')}
						</Button>
					</Form.Group>
				</div>
			</Form>
			<div className="mb-2">
				<Form.Group className="text-center">
					<a href="#" onClick={() => setShowTerms(true)}>
						{t('profile.terms')}
					</a>
				</Form.Group>
				<Form.Group className="text-center">
					<a href="#" onClick={() => setShowPrivacyPolicy(true)}>
						{t('profile.privacyPolicy')}
					</a>
				</Form.Group>
			</div>
		</View>
	);
};

export default LoginForm;
