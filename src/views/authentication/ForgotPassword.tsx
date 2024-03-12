import api from '@src/api';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoLockOpenOutline, IoMailOpenOutline } from 'react-icons/io5';
import ChangePassword from '../profile/settings/ChangePassword';
import { useTranslation } from 'react-i18next';
import { useUser } from '@src/context/UserContext';

const ForgotPassword = ({
	onSuccess,
}: {
	onSuccess: () => void;
}): JSX.Element => {
	const { t } = useTranslation();
	const [emailSent, setEmailSent] = useState<boolean>(false);
	const { user, setUser } = useUser();
	const [codeError, setCodeError] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { register, handleSubmit } = useForm();

	type ForgotPasswordTypes = {
		email: string;
	};

	const handleForgotPassword = async (
		data: ForgotPasswordTypes,
	): Promise<void> => {
		try {
			setIsLoading(true);
			await api.auth.forgotPassword({
				email: data.email,
			});
			setEmailSent(true);
		} catch (error) {
			if (error.error === 'User not found') {
				setEmailError(true);
			}
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	type CheckCodeTypes = {
		code: string;
	};

	const handleCheckCode = async (data: CheckCodeTypes): Promise<void> => {
		try {
			setIsLoading(true);
			setCodeError(false);
			const response = await api.auth.checkCode({
				code: data.code,
			});

			// @ts-expect-error TODO
			if (response.user && response.token) {
				// @ts-expect-error TODO
				setUser(response.user);

				// @ts-expect-error TODO
				localStorage.setItem('ticketlessAuthToken', response.token);
			} else {
				setCodeError(true);
			}
		} catch (error) {
			console.log(error);
			setCodeError(true);
		} finally {
			setIsLoading(false);
		}
	};

	if (user) {
		return (
			<ChangePassword
				onSuccess={() => onSuccess()}
				forgotPassword={true}
			/>
		);
	}

	return emailSent ? (
		<Form
			className="p-4 overflow-auto d-flex flex-column"
			onSubmit={handleSubmit(handleCheckCode)}
		>
			<div className="align-self-center pb-4">
				<IoMailOpenOutline size={55} />
			</div>
			<Form.Group className="text-center">
				<h3>{t('general.checkYourEmail')}</h3>
				{t('general.recoveryCodeSent')}
			</Form.Group>
			<div className="mt-4">
				<Form.Label>{t('general.recoveryCode')}</Form.Label>

				<Form.Control
					{...register('code', {
						required: true,
						value: '',
						setValueAs: value => parseInt(value),
					})}
				/>
				{codeError && (
					<Form.Text className="text-danger">
						{t('general.codeIncorrect')}
					</Form.Text>
				)}
				<div className="d-flex mt-4">
					<Button
						className="me-2 w-100 text-center btn-secondary"
						onClick={onSuccess}
					>
						{t('general.cancel')}
					</Button>
					<Button
						disabled={isLoading}
						className="me-2 w-100 text-center btn-pink"
						type="submit"
					>
						{isLoading
							? t('general.pleaseWait')
							: t('general.next')}
					</Button>
				</div>
			</div>
		</Form>
	) : (
		<Form
			className="p-4 overflow-auto d-flex flex-column"
			onSubmit={handleSubmit(handleForgotPassword)}
		>
			<div className="align-self-center pb-4">
				<IoLockOpenOutline size={55} />
			</div>
			<Form.Group className="text-center">
				<h3>{t('general.forgotPassword')}</h3>
				{t('general.forgotPasswordModalDescription')}
			</Form.Group>
			<div className="mt-4">
				<Form.Label>{t('general.email')}</Form.Label>

				<Form.Control
					maxLength={254}
					type="email"
					{...register('email', { required: true })}
				/>
				{emailError && (
					<Form.Text className="text-danger">
						{t('general.noRegisteredUserFound')}
					</Form.Text>
				)}
				<div className="d-flex mt-4">
					<Button
						className="me-2 w-100 text-center btn-secondary"
						onClick={onSuccess}
					>
						{t('general.cancel')}
					</Button>
					<Button
						disabled={isLoading}
						className="me-2 w-100 text-center btn-pink"
						type="submit"
					>
						{isLoading ? t('general.sending') : t('general.send')}
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default ForgotPassword;
