import React, { useState } from 'react';
import api from '@src/api';
import FilterModal from './FilterModal';
import SearchBar from './SearchBar';
import TrendingList from './TrendingList';
import SearchResults from './SearchResults';
import LocationAccordion from '@src/components/home/LocationAccordion';
import { useQuery } from '@tanstack/react-query';
import View from '@src/components/layout/View';

const Home = (): JSX.Element | null => {
	const { data: events, isPending } = useQuery({
		queryKey: ['events'],
		queryFn: () => api.events.getAll(),
	});

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [location, setLocation] = useState<string>(
		sessionStorage.getItem('location') || '',
	);
	const [eventTypeFilter, setEventTypeFilter] = useState<string>('');
	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const searchActive = searchTerm !== '' || eventTypeFilter !== '';

	return (
		<View
			suspend={isPending}
			topBarProps={{
				header: 'Tapahtumat',
				allowBack: false,
				useLogo: true,
				customContent: (
					<LocationAccordion
						location={location}
						setLocation={setLocation}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						events={events}
					/>
				),
			}}
		>
			<FilterModal
				showFilterModal={showFilterModal}
				setShowFilterModal={setShowFilterModal}
				eventTypeFilter={eventTypeFilter}
				setEventTypeFilter={setEventTypeFilter}
			/>
			<div className="d-flex justify-content-center">
				<SearchBar
					setSearchTerm={setSearchTerm}
					setShowFilterModal={setShowFilterModal}
					eventTypeFilter={eventTypeFilter}
					locationFilter={location}
				/>
			</div>
			{searchActive ? (
				<SearchResults
					events={events}
					searchTerm={searchTerm}
					locationFilter={location}
					eventTypeFilter={eventTypeFilter}
				/>
			) : (
				<TrendingList events={events} locationFilter={location} />
			)}
		</View>
	);
};

export default Home;
