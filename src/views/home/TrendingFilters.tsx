// THIS Component is currently not in use, not yet deleted because it might be needed in the future

import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
	IoCompassOutline,
	IoHomeOutline,
	IoAirplaneOutline,
} from 'react-icons/io5';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';

type PropTypes = {
	setTrendingIn: (trendingIn: string) => void;
};

const TrendingFilters = (props: PropTypes): JSX.Element => {
	const { setTrendingIn } = props;
	const { user } = useUser();
	const [trendingAt, setTrendingAt] = useState<string>('everywhere');

	const { t } = useTranslation();

	const getLocation = async (): Promise<void> => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async position => {
				const response = await api.locations.getLocationData(position);
				setTrendingIn(response.address.city);
			});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	return (
		<div className="d-flex justify-content-around align-items-center gap-3">
			<div
				className="d-flex flex-column align-items-center"
				style={
					trendingAt === 'nearby'
						? {
								borderColor: '#f24594',
								color: '#f24594',
								cursor: 'pointer',
								borderBottom: '2px solid #f24594',
								flex: 1,
							}
						: { cursor: 'pointer', flex: 1 }
				}
				onClick={() => {
					setTrendingAt('nearby');
					getLocation();
				}}
			>
				<IoCompassOutline
					size={25}
					style={trendingAt === 'nearby' ? { color: '#f24594' } : {}}
				/>
				<span style={{ flex: 1 }}>{t('events.nearby')}</span>
			</div>

			<div
				className="d-flex flex-column align-items-center"
				style={
					trendingAt === 'hometown'
						? {
								borderColor: '#f24594',
								color: '#f24594',
								borderBottom: '2px solid #f24594',
								cursor: user?.city ? 'pointer' : 'not-allowed',
								opacity: user?.city ? 1 : 0.5,
								flex: 1,
							}
						: {
								cursor: user?.city ? 'pointer' : 'not-allowed',
								opacity: user?.city ? 1 : 0.5,
								flex: 1,
							}
				}
				onClick={() => {
					if (!user?.city) return;
					setTrendingAt('hometown');
					setTrendingIn(user.city);
				}}
			>
				<IoHomeOutline
					size={25}
					style={
						trendingAt === 'hometown' ? { color: '#f24594' } : {}
					}
				/>
				<span style={{ flex: 1 }}>{t('events.hometownEvents')}</span>
			</div>

			<div
				className="d-flex flex-column align-items-center"
				style={
					trendingAt === 'everywhere'
						? {
								borderColor: '#f24594',
								color: '#f24594',
								cursor: 'pointer',
								borderBottom: '2px solid #f24594',
								flex: 1,
							}
						: { cursor: 'pointer', flex: 1 }
				}
				onClick={() => {
					setTrendingAt('everywhere');
					setTrendingIn('');
				}}
			>
				<IoAirplaneOutline
					size={25}
					style={
						trendingAt === 'everywhere' ? { color: '#f24594' } : {}
					}
				/>
				<span style={{ flex: 1 }}>{t('events.everywhere')}</span>
			</div>
		</div>
	);
};
export default TrendingFilters;
