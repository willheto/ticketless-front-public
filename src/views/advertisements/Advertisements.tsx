import React from 'react';
import AdvertisementItem from './AdvertisementItem';

const ADVERTISEMENT_INTERVAL = 5;
const LOOPING_ADVERTISEMENTS = true;

interface PropTypes {
	itemsLength: number;
	index: number; // index of the item in the list
	advertisements: AdvertisementInterface[] | undefined;
}

// Component for displaying advertisements within a list of items
const Advertisements = ({
	itemsLength,
	index,
	advertisements,
}: PropTypes): JSX.Element | null => {
	if (!advertisements?.length) {
		return null;
	}

	if (itemsLength < ADVERTISEMENT_INTERVAL && index + 1 !== itemsLength) {
		return null;
	}

	const shouldDisplayAd = (): boolean => {
		if (LOOPING_ADVERTISEMENTS) {
			return (index + 1) % ADVERTISEMENT_INTERVAL === 0;
		} else {
			const adIndex = Math.floor(index / ADVERTISEMENT_INTERVAL);
			return (
				(index + 1) % ADVERTISEMENT_INTERVAL === 0 &&
				adIndex < advertisements?.length
			);
		}
	};

	const getAdvertisementIndex = (): number => {
		if (LOOPING_ADVERTISEMENTS) {
			return (
				Math.floor(index / ADVERTISEMENT_INTERVAL) %
				advertisements?.length
			);
		} else {
			return (index + 1) / ADVERTISEMENT_INTERVAL - 1;
		}
	};

	const renderAdvertisementItem = (): JSX.Element => {
		return (
			<div className="w-100 d-flex justify-content-center align-items-center">
				<AdvertisementItem
					advertisement={advertisements[getAdvertisementIndex()]}
				/>
			</div>
		);
	};
	return (
		<>
			{/* If there are less items than (advertisementInterval), display an
			ad after the last item */}
			{itemsLength < ADVERTISEMENT_INTERVAL ? (
				<>{renderAdvertisementItem()}</>
			) : (
				// Else display an ad every (advertisementInterval) items
				<>{shouldDisplayAd() && renderAdvertisementItem()}</>
			)}
		</>
	);
};

export default Advertisements;
