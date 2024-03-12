import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import api from '@src/api';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, useNavigate } from 'react-router-dom';
import logo_vari from '@src/assets/logo_vari_cropped.svg';
import { TermsContent } from '../profile/termsAndPolicies/Terms';
import { towns } from '@src/assets/FinnishTowns';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { PrivacyPolicyContent } from '../profile/termsAndPolicies/PrivacyPolicy';
import View from '@src/components/layout/View';

interface registerProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	passwordVerify: string;
}

const RegisterForm = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			city: '',
			termsAccepted: false,
			passwordVerify: '',
		},
	});

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showTerms, setShowTerms] = useState<boolean>(false);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { t } = useTranslation();

	const onSubmit = async (data: registerProps): Promise<void> => {
		try {
			setIsLoading(true);
			if (data.password !== data.passwordVerify) {
				setIsLoading(false);
				return;
			}
			await api.auth.register(data);

			navigate('/login');
			toast(t('profile.registrationSuccess'));
		} catch (error) {
			console.error(error);
			if (error.error.includes('email has already been taken')) {
				setError(t('profile.alreadyRegistered'));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View topBarProps={{ header: t('profile.register') }}>
			<Modal show={showTerms} onHide={() => setShowTerms(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{t('profile.terms')}</Modal.Title>
				</Modal.Header>
				<TermsContent />
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
			<Form
				className="p-3 pt-0 d-flex flex-column justify-content-between h-100 overflow-auto"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Form.Group className="d-flex justify-content-center mb-3">
						<img style={{ width: '200px' }} src={logo_vari} />
					</Form.Group>
					<Form.Group className="text-center">
						<h3>{t('profile.register')}</h3>
						{t('profile.joinTicketless')}
					</Form.Group>
					<Form.Group className="mt-4 required">
						<Form.Label>{t('general.email')}</Form.Label>
						<Form.Control
							maxLength={254}
							type="email"
							{...register('email', {
								required: t('profile.emailRequired'),
							})}
							placeholder={t('general.email')}
						/>
						<ErrorMessage
							errors={errors}
							name="email"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2 required">
						<Form.Label>{t('profile.password')}</Form.Label>
						<Form.Control
							type="password"
							{...register('password', {
								required: t('profile.passwordRequired'),
								minLength: 8,
								maxLength: 72,
							})}
							placeholder={t('profile.password')}
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ message }) => (
								<p className="text-danger mb-0">
									{message
										? message
										: t(
												'general.passwordLengthRequirement',
											)}
								</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2 required">
						<Form.Label>{t('profile.passwordAgain')}</Form.Label>
						<Form.Control
							type="password"
							{...register('passwordVerify', {
								required: t('profile.passwordRequired'),
								minLength: 8,
								maxLength: 72,
							})}
							placeholder={t('profile.passwordAgain')}
						/>
						{watch('passwordVerify') !== watch('password') ? (
							<p className="text-danger mb-0">
								{t('general.passwordsDontMatch')}
							</p>
						) : (
							<ErrorMessage
								errors={errors}
								name="passwordVerify"
								render={({ message }) => (
									<p className="text-danger mb-0">
										{message
											? message
											: t(
													'general.passwordLengthRequirement',
												)}
									</p>
								)}
							/>
						)}
					</Form.Group>
					<Form.Group className="mt-2 required">
						<Form.Label>{t('profile.firstName')}</Form.Label>
						<Form.Control
							maxLength={50}
							{...register('firstName', {
								required: t('profile.firstNameRequired'),
							})}
							placeholder={t('profile.firstName')}
						/>
						<ErrorMessage
							errors={errors}
							name="firstName"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2 required">
						<Form.Label>{t('profile.lastName')}</Form.Label>
						<Form.Control
							maxLength={50}
							{...register('lastName', {
								required: t('profile.lastNameRequired'),
							})}
							placeholder={t('profile.lastName')}
						/>
						<ErrorMessage
							errors={errors}
							name="lastName"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Label>{t('profile.mobileNumber')}</Form.Label>
						<Form.Control
							maxLength={15}
							{...register('phoneNumber', {
								required: false,
							})}
							placeholder={t('profile.mobileNumber')}
						/>
						<ErrorMessage
							errors={errors}
							name="phoneNumber"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Label>{t('profile.hometown')}</Form.Label>
						<Select
							onChange={e => {
								if (e !== null) {
									setValue('city', e.value.toString());
								} else {
									setValue('city', '');
								}
							}}
							options={towns.map((town: string) => ({
								label: town,
								value: town,
							}))}
							value={
								watch('city') !== ''
									? {
											label: watch('city'),
											value: watch('city'),
										}
									: null
							}
							placeholder={t('profile.hometown')}
							menuPlacement="top"
						/>
						<ErrorMessage
							errors={errors}
							name="city"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					<Form.Group className="mt-2 d-flex flex-column required">
						<div className="d-flex">
							<Form.Check
								type="checkbox"
								className="me-2"
								{...register('termsAccepted', {
									required: t('profile.termsNotAccepted'),
								})}
							/>
							<Form.Label>
								{t('profile.termsAccept')}{' '}
								<a href="#" onClick={() => setShowTerms(true)}>
									{t('profile.terms')}
								</a>{' '}
								{t('profile.andHaveRead')}{' '}
								<a
									href="#"
									onClick={() => setShowPrivacyPolicy(true)}
								>
									{t('profile.readPrivacyPolicy')}
								</a>
							</Form.Label>
						</div>
						<ErrorMessage
							errors={errors}
							name="termsAccepted"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</Form.Group>
					{error && (
						<p className="text-danger">
							{error === t('profile.alreadyRegistered')
								? t('profile.alreadyRegistered')
								: t('profile.registerFailed')}
						</p>
					)}
					<Form.Group className="mt-3 mb-3 d-flex justify-content-center">
						<Button
							disabled={isLoading}
							type="submit"
							className="w-100 text-center btn-pink"
						>
							{isLoading
								? t('general.pleaseWait')
								: t('profile.register')}
						</Button>
					</Form.Group>
				</div>
				<div>
					<Form.Group className="text-center">
						{t('profile.alreadyUser')}{' '}
						<Link to="/profile">{t('general.login')}</Link>
					</Form.Group>
				</div>
			</Form>
		</View>
	);
};

export default RegisterForm;
