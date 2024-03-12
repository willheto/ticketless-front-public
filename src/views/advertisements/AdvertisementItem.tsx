import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useMediaQuery from '@src/components/hooks/useMediaQuery';
import api from '@src/api';

const StyledContainer = styled.div`
	cursor: pointer;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
	width: 100%;
	border-radius: 5px;
	div {
		img {
			border-radius: 5px;
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}

	img {
		border-radius: 5px;
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`;

const AdvertisementItem = ({
	advertisement,
}: {
	advertisement: AdvertisementInterface;
}): JSX.Element => {
	const adRef = useRef(null);
	const { contentHtml, advertisementID, redirectUrl } = advertisement;
	const isDesktop = useMediaQuery('(min-width: 1140px)');

	useEffect(() => {
		const currentAdRef = adRef.current;
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						try {
							api.advertisements.updateView(advertisementID);
						} catch (error) {
							console.log(error);
						}
					}
				});
			},
			// Only trigger when 60% of the ad is visible
			{ threshold: 0.6 },
		);

		if (currentAdRef) {
			observer.observe(currentAdRef);
		}

		return () => {
			if (currentAdRef) {
				observer.unobserve(currentAdRef);
			}
		};
	}, [advertisementID]);

	const handleAdClick = (): void => {
		if (redirectUrl) {
			try {
				api.advertisements.updateClick(advertisementID);
				window
					.open(redirectUrl, '_blank', 'noopener,noreferrer')
					?.focus();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<StyledContainer
			ref={adRef}
			theme={{ isDesktop }}
			onClick={handleAdClick}
			dangerouslySetInnerHTML={{ __html: contentHtml }}
		/>
	);
};

export default AdvertisementItem;
