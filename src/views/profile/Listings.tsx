import api from '@src/api';
import React from 'react';
import Ticket from '../ticket/Ticket';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import View from '@src/components/layout/View';

const Listings = ({ user }: { user: UserInterface }): JSX.Element => {
	const { t } = useTranslation();

	const { data: tickets, isPending } = useQuery({
		queryKey: ['userTickets'],
		queryFn: () => (user ? api.tickets.getAllByUserID(user.userID) : []),
	});

	return (
		<View
			suspend={isPending}
			topBarProps={{ header: t('profile.myListings') }}
		>
			<div className="gap-2 d-flex flex-column">
				{tickets?.length > 0 ? (
					tickets
						?.sort((a: TicketInterface, b: TicketInterface) =>
							a.created_at > b.created_at ? -1 : 1,
						)
						.map((ticket: TicketInterface) => (
							<React.Fragment key={ticket.ticketID}>
								<Ticket ticket={ticket} />
							</React.Fragment>
						))
				) : (
					<p className="mt-2">{t('profile.noListings')}</p>
				)}
			</div>
		</View>
	);
};

export default Listings;
