import api from '@src/api';
import React from 'react';
import { Form } from 'react-bootstrap';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useUser } from '@src/context/UserContext';

const TicketAlerts = ({ eventID }: { eventID: number }): JSX.Element => {
	const { user, setUser } = useUser();
	const { t } = useTranslation();
	const handleAlerts = async (isOn: boolean): Promise<void> => {
		try {
			if (!user) return;
			let payload = {};

			if (isOn) {
				payload = {
					userID: user.userID,
					ticketAlerts: user.ticketAlerts?.concat(eventID),
				};
			} else {
				payload = {
					userID: user.userID,
					ticketAlerts: user.ticketAlerts?.filter(
						id => id !== eventID,
					),
				};
			}

			const response = await api.users.patch(payload);
			setUser(response.user);
			toast(t('events.eventNotificationsUpdated'));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="border-bottom d-flex justify-content-between pb-3">
			<div className="d-flex">
				<IoAlertCircleOutline
					className="align-self-center me-2"
					size={45}
					color="#f24594"
				/>
				<Form.Group>
					<Form.Label>{t('events.eventNotifications')}</Form.Label>
					<div>
						{user
							? t('events.eventNotificationDescription')
							: t('events.loginToUseEventNotifications')}
					</div>
				</Form.Group>
			</div>
			{user && (
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ width: '60px' }}
				>
					<Form.Switch
						defaultChecked={user?.ticketAlerts?.includes(eventID)}
						onChange={e => handleAlerts(e.target.checked)}
						style={{ transform: 'scale(1.5)' }}
					/>
				</div>
			)}
		</div>
	);
};

export default TicketAlerts;
