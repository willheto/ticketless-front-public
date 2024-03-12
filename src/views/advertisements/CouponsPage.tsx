import React, { useContext } from 'react';
import AdvertisementItem from './AdvertisementItem';
import { useTranslation } from 'react-i18next';
import { AdvertisementContext } from '@src/context/AdvertisementContext';
import View from '@src/components/layout/View';

const CouponsPage = (): JSX.Element => {
	const { t } = useTranslation();
	const { globalAdvertisements, isPending } =
		useContext(AdvertisementContext);

	return (
		<View
			suspend={isPending}
			topBarProps={{
				header: t('advertisements.benefits'),
				allowBack: false,
			}}
		>
			<div className="d-flex flex-column gap-4">
				{globalAdvertisements && globalAdvertisements.length > 0 ? (
					globalAdvertisements.map(advertisement => (
						<AdvertisementItem
							key={advertisement.advertisementID}
							advertisement={advertisement}
						/>
					))
				) : (
					<div className="text-muted">
						{t('general.nothing_here_yet')} {'\u{1F634}'}
					</div>
				)}
			</div>
		</View>
	);
};

export default CouponsPage;
