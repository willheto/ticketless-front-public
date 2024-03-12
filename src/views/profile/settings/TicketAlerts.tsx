import api from '@src/api';
import React from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@src/context/UserContext';
import View from '@src/components/layout/View';

const TicketAlertDetails = (): JSX.Element => {
	const { t } = useTranslation();
	const { user, setUser } = useUser();

	const { data: events, isPending } = useQuery({
		queryKey: ['events'],
		queryFn: () => api.events.getAll(),
	});

	const handleAlertRemoval = async (
		e: React.ChangeEvent<HTMLInputElement>,
		event: EventInterface,
	): Promise<void> => {
		try {
			if (!user) return;
			const isChecked = e.target.checked;
			if (!isChecked) {
				const newTicketAlerts = user.ticketAlerts?.filter(
					ticketAlert => ticketAlert !== event.eventID,
				);

				const payload = {
					ticketAlerts: newTicketAlerts,
					userID: user.userID,
				};
				const response = await api.users.patch(payload);
				setUser(response.user);
				toast(t('profile.eventNotificationsDisabled'));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View
			suspend={isPending}
			topBarProps={{ header: t('general.settings') }}
		>
			<div className="d-flex flex-column position-relative h-100 gap-3">
				<h3>{t('profile.eventNotifications')}</h3>

				<div className="d-flex justify-content-between align-items-center py-2 flex-column">
					{events
						?.filter((event: EventInterface) => {
							if (!user) return false;
							return user.ticketAlerts?.includes(event.eventID);
						})
						.map((event: EventInterface) => {
							return (
								<div
									key={event.eventID}
									className="d-flex justify-content-between w-100 border-bottom py-2 align-items-center"
								>
									{event.name}
									<Form.Switch
										id={'event-' + event.eventID}
										defaultChecked={true}
										onChange={async e => {
											handleAlertRemoval(e, event);
										}}
										style={{
											transform: 'scale(1.5)',
										}}
									/>
								</div>
							);
						})}

					{events.length === 0 && (
						<div className="align-self-start">
							{t('profile.eventNotificationsNotFound')}
						</div>
					)}
				</div>
			</div>
		</View>
	);
};

export default TicketAlertDetails;
