import { ErrorMessage } from '@hookform/error-message';
import api from '@src/api';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoPencilOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { towns } from '@src/assets/FinnishTowns';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useUser } from '@src/context/UserContext';

interface ProfileProps {
	email: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	city: string;
	profilePicture: string;
}

interface PropTypes {
	onSuccess: () => void;
}

const EditProfile = (props: PropTypes): JSX.Element | null => {
	const { user, setUser } = useUser();
	const { onSuccess } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			phoneNumber: user?.phoneNumber,
			city: user?.city,
			profilePicture: user?.profilePicture,
		},
	});

	type File = {
		lastModified: number;
		name: string;
		path?: string;
		size: number;
		type: string;
		webkitRelativePath: string;
	};

	const getBase64 = useCallback(async (file: File): Promise<string> => {
		try {
			const reader = new FileReader();
			//@ts-expect-error This works, but TypeScript doesn't like it
			reader.readAsDataURL(file);
			return new Promise<string>((resolve, reject) => {
				reader.onload = (): void => {
					if (typeof reader.result === 'string') {
						resolve(reader.result);
					} else {
						reject(new Error('Failed to read file as base64.'));
					}
				};
				reader.onerror = (error): void => {
					reject(error);
				};
			});
		} catch (error) {
			console.error(error);
			throw new Error('An error occurred while processing the file.');
		}
	}, []);

	const onSubmit = async (data: ProfileProps): Promise<void> => {
		if (!user) return;
		// Post only dirty fields
		const dirtyFields = Object.keys(data).filter(
			key => data[key] !== user[key],
		);

		let payload = dirtyFields.reduce((acc, key) => {
			acc[key] = data[key];

			return acc;
		}, {});

		payload = { ...payload, userID: user.userID };
		setIsLoading(true);

		try {
			const response = await api.users.save(payload);

			setIsLoading(false);

			setUser(response.user);
			toast(t('profile.infoUpdateMessage'));
			onSuccess();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
		useDropzone({
			noDrag: true,
			accept: {
				'image/jpeg': [],
				'image/png': [],
				'image/jpg': [],
				'image/svg': [],
				'image/webp': [],
			},
		});

	const onUpload = useCallback(async () => {
		try {
			const base64 = await getBase64(acceptedFiles[0]);
			setValue('profilePicture', base64);
		} catch (error) {
			console.error(error);
		}
	}, [acceptedFiles, setValue, getBase64]);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			onUpload();
		}
	}, [acceptedFiles, onUpload]);

	if (!user) {
		return <></>;
	}

	return (
		<>
			<div className="p-4 d-flex flex-column position-relative">
				<>
					<Form
						onSubmit={handleSubmit(onSubmit)}
						className="gap-2 d-flex flex-column"
					>
						<div className="align-self-center pb-4">
							<IoPencilOutline size={55} />
						</div>
						<Form.Group className="text-center">
							<h3>{t('profile.editYourInformation')}</h3>
							{t('profile.editInfoDescription')}
						</Form.Group>
						<div className="gap-2 d-flex flex-column mb-2 mt-4">
							<div className="d-flex flex-column">
								<Form.Label>
									{t('profile.profilePicture')}
								</Form.Label>
								<div className="d-flex justify-content-between gap-2">
									{user.profilePicture &&
										watch('profilePicture') !== null && (
											<Button
												className="btn-secondary w-100"
												onClick={() => {
													setValue(
														'profilePicture',
														null,
													);
												}}
											>
												{t(
													'profile.deleteProfilePicture',
												)}
											</Button>
										)}
									<div
										{...getRootProps()}
										style={{
											width: 'max-content',
										}}
										className="w-100"
									>
										<input {...getInputProps()} />
										<Button className="btn-pink w-100">
											{t('profile.uploadProfilePicture')}
										</Button>
									</div>
								</div>
								{acceptedFiles.length > 0 && (
									<div className="overflow-hidden text-truncate">
										{acceptedFiles[0].name}
									</div>
								)}
								{fileRejections.length > 0 && (
									<div className="text-danger">
										{t('profile.fileRejectionNotification')}
									</div>
								)}
							</div>
							<div className="d-flex flex-column required">
								<Form.Label>
									{t('profile.firstName')}
								</Form.Label>
								<Form.Control
									{...register('firstName', {
										required: t(
											'profile.firstNameRequired',
										),
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="firstName"
									render={({ message }) => (
										<p className="text-danger mb-0">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="d-flex flex-column required">
								<Form.Label>{t('profile.lastName')}</Form.Label>
								<Form.Control
									{...register('lastName', {
										required: t('profile.lastNameRequired'),
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="lastName"
									render={({ message }) => (
										<p className="text-danger mb-0">
											{message}
										</p>
									)}
								/>
							</div>

							<div className="d-flex flex-column required">
								<Form.Label>{t('general.email')}</Form.Label>
								<Form.Control
									{...register('email', {
										required: t('profile.emailRequired'),
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="email"
									render={({ message }) => (
										<p className="text-danger mb-0">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="d-flex flex-column">
								<Form.Label>
									{t('profile.mobileNumber')}
								</Form.Label>
								<Form.Control
									{...register('phoneNumber', {
										required: false,
									})}
								/>
							</div>
							<div className="d-flex flex-column">
								<Form.Label>{t('profile.hometown')}</Form.Label>
								<Select
									onChange={e => {
										if (e !== null && e.value) {
											setValue(
												'city',
												e.value.toString(),
											);
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
								/>
							</div>
						</div>
						<div className="d-flex ">
							<Button
								className="me-2 w-100 text-center btn-secondary"
								onClick={onSuccess}
							>
								{t('general.cancel')}
							</Button>
							<Button
								disabled={isLoading}
								type="submit"
								className="w-100 d-flex justify-content-center align-items-center btn-pink"
							>
								{isLoading
									? t('general.saving')
									: t('general.save')}
							</Button>
						</div>
					</Form>
				</>
			</div>
		</>
	);
};

export default EditProfile;
