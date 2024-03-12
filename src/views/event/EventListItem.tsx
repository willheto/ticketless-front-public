import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoLocation, IoTicket } from 'react-icons/io5';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import useMediaQuery from '@src/components/hooks/useMediaQuery';
import styled from 'styled-components';
import { utcStringToLocalDate, formatDate } from '@src/utils/dateUtils';

const EventCard = styled.div`
	background-color: #fff;
	color: #333;
	border-radius: 10px;
	position: relative;
	width: 100%;
	cursor: pointer;
`;

type propTypes = {
	event: EventInterface;
};

const Event = (props: propTypes): JSX.Element => {
	const { event } = props;
	const { t } = useTranslation();

	const isDesktop = useMediaQuery('(min-width: 1140px)');
	const navigate = useNavigate();

	const handleEventClick = (): void => {
		navigate('/events/' + event.eventID);
	};

	const ticketsCount =
		(event?.ticketsBuyingCount || 0) + (event?.ticketsSellingCount || 0);

	return (
		<EventCard
			theme={{ isDesktop }}
			onClick={() => handleEventClick()}
			className="shadow-sm border rounded d-flex flex-column justify-content-between"
		>
			{event?.image ? (
				<div>
					<img
						// Show base64 image if image is not loaded
						src={event.image}
						className="rounded-top"
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
							minWidth: '100%',
							minHeight: '100%',
						}}
					/>
				</div>
			) : null}
			<div className="p-2" style={{ position: 'relative', zIndex: '1' }}>
				<Form.Group className="d-flex align-items-center gap-1">
					{event.organizationID && (
						<span className="d-flex mt-1">
							<RiVerifiedBadgeFill
								stroke="blue"
								size={20}
								fill="#1DA1F2"
							/>
						</span>
					)}
					<Form.Label
						style={{
							fontWeight: 'bold',
							fontSize: '1.1rem',
						}}
					>
						{event.name}
					</Form.Label>
				</Form.Group>
				<Form.Group
					className="d-flex align-items-center"
					style={{
						marginBottom: '4px',
						fontSize: '1rem',
						marginLeft: '1px',
					}}
				>
					<span style={{ color: 'grey' }}>
						{formatDate(utcStringToLocalDate(event.date))}
					</span>
				</Form.Group>
				<Form.Group
					className="d-flex align-items-center gap-3"
					style={{ marginLeft: '-2px', marginBottom: '3px' }}
				>
					<div>
						<IoLocation size={20} style={{ color: '#f24594' }} />
						<span style={{ marginLeft: '5px' }}>
							{event.location}
						</span>
					</div>
					{event.status !== 'redirect' && (
						<div>
							<IoTicket size={20} style={{ color: '#f24594' }} />
							<span style={{ marginLeft: '5px' }}>
								{ticketsCount}{' '}
								{ticketsCount === 1
									? t('events.listing')
									: t('events.listings')}
							</span>
						</div>
					)}
				</Form.Group>
			</div>
		</EventCard>
	);
};

export default Event;
