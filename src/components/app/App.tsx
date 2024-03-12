import React, { useEffect, useState, useRef, useContext } from 'react';
import AppRoutes from './App.routes';
import styled from 'styled-components';
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent from '../cookies/CookieConsent';
import axiosInstance from '@src/api/axiosInstance';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import InstallApp from '../pwaPrompt/InstallApp';
import InstallAppIOS from '../pwaPrompt/InstallAppIOS';
import { AdvertisementContext } from '@src/context/AdvertisementContext';
import { useUser } from '@src/context/UserContext';

// Be careful when changing these, it might break the app on mobile
const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-right: env(safe-area-inset-right);
	padding-left: env(safe-area-inset-left);
	width: 100%;
`;

const swirl = cssTransition({
	enter: 'scale-in-center',
	exit: 'scale-out-center',
});

const StyledToast = styled.div`
	overflow: hidden;
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

// Mostly for developers :D
const TOAST_AD_ENABLED = true;
const INSTALL_PROMPT_ENABLED = true;

const App = (): JSX.Element => {
	const isDesktop = useMediaQuery('(min-width: 1140px)');
	const { setUser } = useUser();

	const { i18n } = useTranslation();
	const toastRef = useRef(null);

	// Set language from browser settings
	const setLanguage = (): void => {
		const browserLanguage = navigator?.language?.split('-')[0];
		if (browserLanguage === 'fi') {
			i18n.changeLanguage('fi');
		} else {
			i18n.changeLanguage('en');
		}
	};

	const { toastAdvertisement } = useContext(AdvertisementContext);

	useEffect(() => {
		if (toastAdvertisement && !toastRef.current && TOAST_AD_ENABLED) {
			toast(
				() => (
					<StyledToast
						onClick={() => {
							if (toastAdvertisement.redirectUrl) {
								window.open(
									toastAdvertisement.redirectUrl,
									'_blank',
								);
							}
						}}
						ref={toastRef}
						dangerouslySetInnerHTML={{
							__html: toastAdvertisement.contentHtml,
						}}
					/>
				),
				{
					hideProgressBar: true,
					autoClose: false,
					closeOnClick: false,
					bodyClassName: 'p-0',
					className: 'p-0',
				},
			);
		}
	}, [toastAdvertisement]);

	/**
	 * Fetch user data from the backend
	 */
	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			if (localStorage.getItem('ticketlessAuthToken')) {
				try {
					const response = await axiosInstance.post('/user/auth', {
						token: localStorage.getItem('ticketlessAuthToken'),
					});

					// @ts-expect-error TODO
					setUser(response.user);
					//@ts-expect-error TODO
					if (response.user.language) {
						//@ts-expect-error TODO
						i18n.changeLanguage(response.user.language);
					} else {
						setLanguage();
					}
				} catch (error) {
					console.log(error);

					if (
						error.error === 'Expired token' ||
						error.error === 'Invalid token'
					) {
						localStorage.removeItem('ticketlessAuthToken');
					}
					setUser(null);
					setLanguage();
				}
			}
		};

		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [installPromptActive, setInstallPromptActive] =
		useState<boolean>(false);

	if (isDesktop) {
		return (
			<div className="d-flex flex-column w-100 align-items-center">
				<Wrapper>
					<CookieConsent />
					<AppRoutes />
					<ToastContainer
						draggablePercent={40}
						position="top-right"
						autoClose={5000}
						closeButton={true}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						progressStyle={{ background: '#f24594' }}
						transition={swirl}
						style={{
							width: '400px',
							maxWidth: '400px',
							margin: 0,
							top: '3px',
						}}
					/>
				</Wrapper>
			</div>
		);
	} else {
		return (
			<Wrapper>
				{INSTALL_PROMPT_ENABLED && (
					<>
						<>{!installPromptActive && <CookieConsent />}</>
						<InstallApp
							setInstallPromptActive={setInstallPromptActive}
						/>
						<InstallAppIOS
							setInstallPromptActive={setInstallPromptActive}
						/>
					</>
				)}
				<AppRoutes />
				<ToastContainer
					draggablePercent={40}
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeButton={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					progressStyle={{ background: '#f24594' }}
					transition={swirl}
				/>
			</Wrapper>
		);
	}
};

export default App;
