import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
	IoBookOutline,
	IoChevronForwardSharp,
	IoLogOutOutline,
	IoMailOutline,
	IoPersonOutline,
	IoReaderOutline,
	IoSettingsOutline,
} from 'react-icons/io5';
import api from '@src/api';
import { useTranslation } from 'react-i18next';
import { useUser } from '@src/context/UserContext';
import View from '@src/components/layout/View';
import styled from 'styled-components';

const StyledLinksList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	> div {
		cursor: pointer;
	}
`;

const Profile = ({ user }: { user: UserInterface }): JSX.Element | null => {
	const { setUser } = useUser();
	const [showModal, setShowModal] = useState<boolean>(false);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const handleLogout = async (): Promise<void> => {
		try {
			await api.auth.logout();
			setUser(null);
			setShowModal(false);
			navigate('/login');
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
			<div className="d-flex h-100 flex-column gap-3">
				<Modal
					centered
					show={showModal}
					onHide={() => setShowModal(false)}
				>
					<div className="p-4 d-flex flex-column">
						<div className="align-self-center pb-4">
							<IoLogOutOutline size={55} />
						</div>
						<Form.Group className="text-center">
							<h3>{t('profile.logOut')}</h3>
							{t('profile.logOutModalText')}
						</Form.Group>

						<div className="d-flex mt-4">
							<Button
								onClick={() => setShowModal(false)}
								variant="secondary"
								className="w-100 me-2"
							>
								{t('profile.logOutCancel')}
							</Button>
							<Button
								onClick={() => handleLogout()}
								className="btn-pink w-100"
							>
								{t('profile.logOut')}
							</Button>
						</div>
					</div>
				</Modal>
				<h3>
					{t('profile.userGreeting')} {user.firstName}
				</h3>
				<StyledLinksList>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => navigate('listings')}
					>
						<div>
							<IoReaderOutline size={25} className="me-3" />
							{t('profile.myListings')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => navigate('details')}
					>
						<div>
							<IoPersonOutline size={25} className="me-3" />
							{t('profile.personalInformation')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => navigate('settings')}
					>
						<div>
							<IoSettingsOutline size={25} className="me-3" />
							{t('general.settings')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => navigate('support')}
					>
						<div>
							<IoMailOutline size={25} className="me-3" />
							{t('general.contactUs')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => navigate('terms-and-policies')}
					>
						<div>
							<IoBookOutline size={25} className="me-3" />
							{t('profile.termsAndPrivacy')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => setShowModal(true)}
					>
						<div>
							<IoLogOutOutline size={25} className="me-3" />
							{t('profile.logOut')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
				</StyledLinksList>
			</div>
		</View>
	);
};

export default Profile;
