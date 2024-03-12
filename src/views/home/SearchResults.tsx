import React from 'react';
import EventListItem from '../event/EventListItem';
import { useTranslation } from 'react-i18next';

type PropTypes = {
	events: EventInterface[];
	searchTerm: string;
	locationFilter: string;
	eventTypeFilter: string;
};

const SearchResults = (props: PropTypes): JSX.Element => {
	const { events, searchTerm, locationFilter, eventTypeFilter } = props;
	const { t } = useTranslation();

	const filterEventsBySearchTerm = (): EventInterface[] => {
		let filteredEvents = [...events];
		if (searchTerm !== '') {
			filteredEvents = filteredEvents.filter(event => {
				return event.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			});
		}

		if (locationFilter !== '') {
			filteredEvents = filteredEvents.filter(
				event => event.location === locationFilter,
			);
		}

		if (eventTypeFilter !== '') {
			filteredEvents = filteredEvents.filter(
				event => event.type === eventTypeFilter,
			);
		}

		return filteredEvents;
	};

	if (filterEventsBySearchTerm().length === 0) {
		return (
			<div className="d-flex mt-4 justify-content-center">
				{t('events.no_search_results')}{' '}
				{locationFilter && `${t('events.in_place')} ${locationFilter}`}
			</div>
		);
	}

	return (
		<div className="mt-2 d-flex flex-column align-items-center">
			{filterEventsBySearchTerm().map(event => (
				<EventListItem key={event.eventID} event={event} />
			))}
		</div>
	);
};

export default SearchResults;
