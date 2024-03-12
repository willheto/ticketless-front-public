import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EditProfile from './EditProfile';
import Avatar from 'react-avatar';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';

const ProfileDetails = ({ user }: { user: UserInterface }): JSX.Element => {
	const { t } = useTranslation();
	const [showEditModal, setShowEditModal] = useState<boolean>(false);

	return (
		<View
			topBarProps={{
				header: t('profile.personalInformation'),
			}}
		>
			<Modal
				show={showEditModal}
				onHide={() => setShowEditModal(false)}
				centered
			>
				<EditProfile onSuccess={() => setShowEditModal(false)} />
			</Modal>
			<div className="flex-fill h-100">
				<div className="gap-2 d-flex flex-column">
					<div className="d-flex gap-3 mb-2 align-items-center">
						{user.profilePicture ? (
							<img
								src={user.profilePicture}
								style={{
									objectFit: 'scale-down',
									width: '80px',
									height: '80px',
									borderRadius: '50%',
								}}
								onClick={() => setShowEditModal(true)}
							/>
						) : (
							<Avatar
								color="#f24594"
								name={user.firstName}
								size="80"
								round={true}
								onClick={() => setShowEditModal(true)}
							/>
						)}
						<div className="d-flex flex-column flex-fill">
							<div className="d-flex flex-column flex-fill">
								<Form.Label>
									{t('profile.firstName')}
								</Form.Label>
								{user.firstName || t('general.notSet')}
							</div>
							<hr
								className="m-0 w-100"
								style={{ borderTop: '2px solid #dee2e6' }}
							/>
							<div className="d-flex flex-column">
								<Form.Label>{t('profile.lastName')}</Form.Label>
								{user.lastName || t('general.notSet')}
							</div>
						</div>
					</div>
					<hr
						className="m-0"
						style={{ borderTop: '2px solid #dee2e6' }}
					/>
					<div className="d-flex flex-column">
						<Form.Label>{t('general.email')}</Form.Label>
						{user.email || t('general.notSet')}
					</div>
					<hr
						className="m-0"
						style={{ borderTop: '2px solid #dee2e6' }}
					/>
					<div className="d-flex flex-column">
						<Form.Label>{t('profile.mobileNumber')}</Form.Label>
						{user.phoneNumber || t('general.notSet')}
					</div>
					<hr
						className="m-0"
						style={{ borderTop: '2px solid #dee2e6' }}
					/>
					<div className="d-flex flex-column">
						<Form.Label>{t('profile.hometown')}</Form.Label>
						{user.city || t('general.notSet')}
					</div>
					<hr
						className="m-0"
						style={{ borderTop: '2px solid #dee2e6' }}
					/>
					<div className="d-flex flex-column">
						<Form.Label>{t('profile.userCreated')}</Form.Label>
						{new Date(user.created_at).toLocaleDateString()}
					</div>
				</div>
				<Button
					className="d-flex justify-content-center align-items-center btn-pink mt-4"
					onClick={() => setShowEditModal(true)}
				>
					{t('profile.editPersonalInformation')}
				</Button>
			</div>
		</View>
	);
};

export default ProfileDetails;
