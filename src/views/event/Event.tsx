import api from '@src/api';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import EventTickets from './EventTickets';
import EventTicketSaleRedirect from './EventTicketSaleRedirect';
import View from '@src/components/layout/View';

const Event = (): JSX.Element => {
	const { t } = useTranslation();
	const { eventID: eventIDFromParams } = useParams();
	const eventID = Number(eventIDFromParams);

	const { data: event, isPending } = useQuery({
		queryKey: ['event', eventID],
		queryFn: () => api.events.getSingle(eventID),
	});

	const redirectToTicketSale = event?.status === 'redirect';

	if (isPending) {
		return (
			<View
				suspend={isPending}
				topBarProps={{ header: t('general.tickets') }}
			/>
		);
	}

	return (
		<>
			{event ? (
				<>
					{redirectToTicketSale ? (
						<EventTicketSaleRedirect event={event} />
					) : (
						<EventTickets event={event} />
					)}
				</>
			) : (
				<div className="h-100 d-flex align-items-center justify-content-center text-center">
					<h3>{t('general.event_not_exists')}</h3>
				</div>
			)}
		</>
	);
};
export default Event;
