import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import {
	IoChevronForwardSharp,
	IoKeyOutline,
	IoLanguageOutline,
} from 'react-icons/io5';
import ChangePassword from './ChangePassword';
import { useTranslation } from 'react-i18next';
import api from '@src/api';
import { toast } from 'react-toastify';
import View from '@src/components/layout/View';
import styled from 'styled-components';

const StyledSettingsLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	> div {
		cursor: pointer;
	}
`;

const Settings = ({ user }: { user: UserInterface }): JSX.Element | null => {
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const { t, i18n } = useTranslation();

	const changeLanguage = async (language: string): Promise<void> => {
		try {
			if (!user) return;
			i18n.changeLanguage(language);
			await api.users.patch({ userID: user.userID, language });
			toast(t('profile.languageChanged'));
		} catch (error) {
			console.log(error);
		}
	};

	if (!user) return null;

	return (
		<View topBarProps={{ header: t('general.settings') }}>
			<div className="d-flex flex-column position-relative h-100 gap-3">
				<Modal
					show={showEditModal}
					onHide={() => setShowEditModal(false)}
					centered
				>
					<ChangePassword onSuccess={() => setShowEditModal(false)} />
				</Modal>
				<StyledSettingsLinks>
					<div
						className="d-flex justify-content-between align-items-center border-bottom py-2"
						onClick={() => setShowEditModal(true)}
					>
						<div>
							<IoKeyOutline size={25} className="me-3" />
							{t('general.changePassword')}
						</div>
						<IoChevronForwardSharp size={'20'} />
					</div>
					<div className="d-flex justify-content-between align-items-center border-bottom py-2">
						<div>
							<IoLanguageOutline size={25} className="me-3" />
							{t('profile.language')}
						</div>
						<Form.Select
							style={{ width: '105px', cursor: 'pointer' }}
							onChange={e => changeLanguage(e.target.value)}
							defaultValue={i18n.language}
						>
							<option value="fi">Suomi</option>
							<option value="en">English</option>
						</Form.Select>
					</div>
				</StyledSettingsLinks>
			</div>
		</View>
	);
};

export default Settings;
