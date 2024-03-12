import React, { useContext } from 'react';
import EventListItem from '../event/EventListItem';
import useMediaQuery from '@src/components/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AdvertisementContext } from '@src/context/AdvertisementContext';
import Advertisements from '@src/views/advertisements/Advertisements';

type PropTypes = {
	events: EventInterface[];
	locationFilter: string;
};

const EventCard = styled.div`
	position: relative;
	width: ${(props): string => (props.theme.isDesktop ? '350px' : '100%')};
`;

const TrendingList = ({ events, locationFilter }: PropTypes): JSX.Element => {
	const isDesktop = useMediaQuery('(min-width: 1140px)');
	const { t } = useTranslation();

	const { globalAdvertisements, getLocalAdvertisements } =
		useContext(AdvertisementContext);

	const advertisements = locationFilter
		? getLocalAdvertisements && getLocalAdvertisements(locationFilter)
		: globalAdvertisements;

	const filteredEvents = events
		.filter(
			event => locationFilter === '' || event.location === locationFilter,
		)
		.sort((a, b) => b?.trendingScore - a?.trendingScore);

	let emptyEvents = 0;
	// If events cannot bve divided by 3, add empty events to fill the row
	if (isDesktop && filteredEvents.length % 3 !== 0) {
		emptyEvents = 3 - (filteredEvents.length % 3);
	}

	if (filteredEvents.length === 0) {
		return (
			<div className="d-flex mt-4 justify-content-center h-100">
				{t('events.no_events')}{' '}
				{locationFilter && `${t('events.in_place')} ${locationFilter}`}
			</div>
		);
	}

	return (
		<div className={`mt-2 d-flex flex-column gap-2 align-items-center`}>
			{filteredEvents.map((event, index) => (
				<React.Fragment key={event.eventID}>
					<EventListItem event={event} />
					<Advertisements
						itemsLength={filteredEvents.length}
						index={index}
						advertisements={advertisements}
					/>
				</React.Fragment>
			))}

			{[...Array(emptyEvents)].map((_, index) => (
				<EventCard key={index} theme={{ isDesktop }} />
			))}
		</div>
	);
};

export default TrendingList;
