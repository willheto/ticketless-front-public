import { ErrorMessage } from '@hookform/error-message';
import api from '@src/api';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoLockOpenOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useUser } from '@src/context/UserContext';

type PropTypes = {
	onSuccess: () => void;
	forgotPassword?: boolean;
};

const ChangePassword = (props: PropTypes): JSX.Element => {
	const { user } = useUser();
	const { onSuccess, forgotPassword } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	console.log(user);
	const onSubmit = async (data: {
		oldPassword: string;
		newPassword: string;
		newPasswordRepeat: string;
	}): Promise<void> => {
		try {
			console.log(user);
			if (!user) return;
			if (data.newPassword !== data.newPasswordRepeat) {
				return;
			}
			setIsLoading(true);

			if (forgotPassword) {
				const payload = {
					userID: user.userID,
					password: data.newPassword,
					passwordCode: user.passwordCode,
				};

				await api.users.save(payload);
				setIsLoading(false);
				onSuccess();
			} else {
				const payload = {
					userID: user.userID,
					password: data.oldPassword,
				};

				const response = await api.auth.checkPassword(payload);

				// @ts-expect-error This is a valid check
				if (response.isValid) {
					const payload = {
						userID: user.userID,
						password: data.newPassword,
					};
					await api.users.save(payload);
					toast(t('general.passwordChanged'));
					onSuccess();
				}
			}
		} catch (error) {
			setIsPasswordWrong(true);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-4 d-flex flex-column position-relative">
			<>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="d-flex flex-column"
				>
					<div className="align-self-center pb-4">
						<IoLockOpenOutline size={55} />
					</div>
					<Form.Group className="text-center">
						<h3>{t('general.changePassword')}</h3>
						{t('general.passwordLengthRequirement')}
					</Form.Group>
					<div className="gap-2 mt-4 d-flex flex-column">
						{!forgotPassword && (
							<div className="d-flex flex-column">
								<Form.Label>
									{t('general.currentPassword')}
								</Form.Label>
								<Form.Control
									type="password"
									{...register('oldPassword', {
										required: t(
											'general.insertCurrentPassword',
										),
									})}
								/>
								{isPasswordWrong ? (
									<p className="text-danger mb-0">
										{t('general.wrongPassword')}
									</p>
								) : (
									<ErrorMessage
										errors={errors}
										name="oldPassword"
										render={({ message }) => (
											<p className="text-danger mb-0">
												{message}
											</p>
										)}
									/>
								)}
							</div>
						)}

						<div className="d-flex flex-column">
							<Form.Label>{t('general.newPassword')}</Form.Label>
							<Form.Control
								minLength={8}
								type="password"
								{...register('newPassword', {
									required: t('general.insertNewPassword'),
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="newPassword"
								render={({ message }) => (
									<p className="text-danger mb-0">
										{message}
									</p>
								)}
							/>
						</div>
						<div className="d-flex flex-column">
							<Form.Label>
								{t('general.insertNewPasswordAgain')}
							</Form.Label>
							<Form.Control
								minLength={8}
								type="password"
								{...register('newPasswordRepeat', {
									required: t(
										'general.insertNewPasswordAgain',
									),
								})}
							/>
							{watch('newPassword') !==
							watch('newPasswordRepeat') ? (
								<p className="text-danger mb-0">
									{t('general.passwordsDontMatch')}
								</p>
							) : (
								<ErrorMessage
									errors={errors}
									name="newPasswordRepeat"
									render={({ message }) => (
										<p className="text-danger mb-0">
											{message}
										</p>
									)}
								/>
							)}
						</div>
					</div>
					<div className="d-flex mt-3">
						<Button
							className="me-2 w-100 text-center btn-secondary"
							onClick={onSuccess}
						>
							{t('general.cancel')}
						</Button>
						<Button
							className="w-100 text-center btn-pink"
							disabled={isLoading}
							type="submit"
						>
							{isLoading
								? t('general.saving')
								: t('general.save')}
						</Button>
					</div>
				</Form>
			</>
		</div>
	);
};

export default ChangePassword;
