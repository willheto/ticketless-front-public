import api from '@src/api';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Ticket from '../ticket/Ticket';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import Advertisements from '../advertisements/Advertisements';
import { AdvertisementContext } from '@src/context/AdvertisementContext';
import { Button, Modal } from 'react-bootstrap';
import NewListing from '../listing/ListingForm';
import { useUser } from '@src/context/UserContext';
import View from '@src/components/layout/View';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@src/index';

const StyledTabs = styled(Tabs)`
	flex: 1;
	max-width: 500px;
`;

const StyledTicketsCountLabel = styled.span<{ $isZero: boolean }>`
	background-color: ${(props): string =>
		props.$isZero ? 'gray' : '#f24594'};
	color: white;
	border-radius: 10px;
	padding: 0 8px;
	font-weight: 500;
	font-size: 12px;
	margin-left: 10px;
`;

const EventTabs = ({ handleTabChange, tabIndex, t, event }): JSX.Element => {
	return (
		<StyledTabs
			onSelect={handleTabChange}
			activeKey={tabIndex}
			justify
			className="tabs"
		>
			<Tab
				title={
					<>
						<span>{t('events.selling')}</span>
						<StyledTicketsCountLabel
							$isZero={event.ticketsSellingCount === 0}
						>
							{event.ticketsSellingCount}
						</StyledTicketsCountLabel>
					</>
				}
				eventKey={0}
			/>
			<Tab
				title={
					<div>
						<span>{t('events.buying')}</span>
						<StyledTicketsCountLabel
							$isZero={event.ticketsBuyingCount === 0}
						>
							{event.ticketsBuyingCount}
						</StyledTicketsCountLabel>
					</div>
				}
				eventKey={1}
			/>
		</StyledTabs>
	);
};

const EventTickets = ({ event }: { event: EventInterface }): JSX.Element => {
	const { user } = useUser();
	const { t } = useTranslation();
	const { eventID: eventIDFromParams } = useParams();
	const eventID = Number(eventIDFromParams);
	const [showCreateListingModal, setShowCreateListingModal] =
		useState<boolean>(false);
	const [selling, setSelling] = useState<boolean>(true);

	const { data: tickets, isPending } = useQuery({
		queryKey: ['tickets', eventID],
		queryFn: () => api.tickets.getAllByEventID(event.eventID),
		enabled: !!eventID,
	});

	const [tabIndex, setTabIndex] = useState<number>(0);

	const handleTabChange = (newIndex: string): void => {
		setTabIndex(Number(newIndex));
	};

	const [advertisements, setAdvertisements] = useState<
		AdvertisementInterface[]
	>([]);

	const { getLocalAdvertisements } = useContext(AdvertisementContext);

	useEffect(() => {
		if (getLocalAdvertisements && event?.location) {
			setAdvertisements(getLocalAdvertisements(event?.location));
		}
	}, [getLocalAdvertisements, event?.location]);

	return (
		<View
			suspend={isPending}
			topBarProps={{
				header: event ? event.name : t('general.tickets'),
				customContent: (
					<EventTabs
						event={event}
						handleTabChange={handleTabChange}
						tabIndex={tabIndex}
						t={t}
					/>
				),
			}}
		>
			{user && (
				<Modal
					centered
					show={showCreateListingModal}
					onHide={() => setShowCreateListingModal(false)}
				>
					<NewListing
						onSuccess={ticket => {
							setShowCreateListingModal(false);
							queryClient.setQueryData(
								['tickets', eventID],
								(oldTickets: TicketInterface[]) => {
									return [...oldTickets, ticket];
								},
							);
						}}
						onClose={() => setShowCreateListingModal(false)}
						event={event}
						isSelling={selling}
						disableVerifyModal={true}
					/>
				</Modal>
			)}
			{tabIndex === 0 ? (
				<div className="d-flex flex-column gap-2">
					{user && (
						<div className="d-flex justify-content-center mb-3">
							<Button
								onClick={() => {
									setSelling(true);
									setShowCreateListingModal(true);
								}}
								className="btn-pink"
							>
								+ {t('listing.new_selling_listing')}
							</Button>
						</div>
					)}
					{tickets?.filter(
						(ticket: TicketInterface) => ticket.isSelling,
					).length === 0 ? (
						<div className="d-flex flex-column align-items-center mt-4">
							{t('events.noTicketsToBuy')}
						</div>
					) : (
						<>
							{tickets
								?.filter(
									(ticket: TicketInterface) =>
										ticket.isSelling,
								)
								.sort(
									(a: TicketInterface, b: TicketInterface) =>
										Math.floor(
											new Date(b.created_at).getTime(),
										) -
										Math.floor(
											new Date(a.created_at).getTime(),
										),
								)
								.map(
									(
										ticket: TicketInterface,
										index: number,
									) => (
										<React.Fragment key={ticket.ticketID}>
											<Ticket ticket={ticket} />
											<Advertisements
												itemsLength={
													tickets?.filter(
														ticket =>
															ticket?.isSelling,
													).length
												}
												index={index}
												advertisements={advertisements}
											/>
										</React.Fragment>
									),
								)}
						</>
					)}
				</div>
			) : (
				<div className="d-flex flex-column gap-2">
					{user && (
						<div className=" d-flex justify-content-center mb-3">
							<Button
								onClick={() => {
									setSelling(false);
									setShowCreateListingModal(true);
								}}
								className="btn-gray"
							>
								+ {t('listing.new_buying_request')}
							</Button>
						</div>
					)}
					{tickets.filter(
						(ticket: TicketInterface) => !ticket.isSelling,
					).length === 0 ? (
						<div className="d-flex flex-column align-items-center mt-4">
							{t('events.noBuyingRequests')}
						</div>
					) : (
						<>
							{tickets
								.filter(
									(ticket: TicketInterface) =>
										!ticket.isSelling,
								)
								.sort(
									(a: TicketInterface, b: TicketInterface) =>
										Math.floor(
											new Date(b.created_at).getTime(),
										) -
										Math.floor(
											new Date(a.created_at).getTime(),
										),
								)
								.map(
									(
										ticket: TicketInterface,
										index: number,
									) => (
										<React.Fragment key={ticket.ticketID}>
											<Ticket ticket={ticket} />
											<Advertisements
												itemsLength={
													tickets.filter(
														ticket =>
															!ticket.isSelling,
													).length
												}
												index={index}
												advertisements={advertisements}
											/>
										</React.Fragment>
									),
								)}
						</>
					)}
				</div>
			)}
		</View>
	);
};
export default EventTickets;
