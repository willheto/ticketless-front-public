import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBarWrapper } from './StyledComponents';
import {
	IoSearchOutline,
	IoAddCircleOutline,
	IoChatboxEllipsesOutline,
	IoPersonOutline,
	IoDiamondOutline,
} from 'react-icons/io5';
import useMediaQuery from '@src/components/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';

const NavigationBarLink = ({
	linkTo,
	children,
}: {
	linkTo: string;
	children: React.ReactNode;
}): JSX.Element => (
	<Link
		to={`${linkTo}`}
		style={{
			textDecoration: 'none',
			color: 'black',
			fontSize: '12px',
			flex: 1,
		}}
		className="d-flex flex-column align-items-center"
	>
		{children}
	</Link>
);

const NavigationBar = ({
	forceDisplay,
}: {
	forceDisplay?: boolean;
}): JSX.Element => {
	const { user } = useUser();
	const currentTab = window.location.pathname.split('/')[1];
	const { t } = useTranslation();
	const isDesktop = useMediaQuery('(min-width: 1140px)');
	const [isUnreadMessages, setIsUnreadMessages] = useState<boolean>(false);

	const checkForUnreadMessages = async (): Promise<void> => {
		try {
			const response = await api.messages.hasUnreadMessages();
			// @ts-expect-error API response is not typed
			setIsUnreadMessages(response.isUnreadMessages);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user) {
			checkForUnreadMessages();
		}
	}, [user]);

	return (
		<NavigationBarWrapper
			className={
				isDesktop
					? 'd-flex justify-content-around align-items-center gap-4'
					: 'd-flex justify-content-around align-items-center border-top'
			}
			theme={{ isDesktop, forceDisplay }}
		>
			<NavigationBarLink linkTo="/events">
				{isDesktop ? (
					<IoSearchOutline size={28} style={{ color: 'white' }} />
				) : (
					<IoSearchOutline
						size={28}
						style={
							currentTab === 'events'
								? { color: '#f24594' }
								: { color: 'black' }
						}
					/>
				)}

				<span
					style={
						isDesktop
							? { color: 'white' }
							: currentTab === 'events'
								? { color: '#f24594' }
								: { color: 'black' }
					}
				>
					{t('general.events')}
				</span>
			</NavigationBarLink>
			<NavigationBarLink linkTo="/newListing">
				{isDesktop ? (
					<IoAddCircleOutline size={28} style={{ color: 'white' }} />
				) : (
					<IoAddCircleOutline
						size={28}
						style={
							currentTab === 'newListing'
								? { color: '#f24594' }
								: { color: 'black' }
						}
					/>
				)}
				<span
					style={
						isDesktop
							? { color: 'white', whiteSpace: 'pre' }
							: currentTab === 'newListing'
								? { color: '#f24594' }
								: { color: 'black' }
					}
				>
					{t('general.newListing')}
				</span>
			</NavigationBarLink>
			<NavigationBarLink linkTo="/advertisements">
				{isDesktop ? (
					<IoDiamondOutline size={28} style={{ color: 'white' }} />
				) : (
					<IoDiamondOutline
						size={28}
						style={
							currentTab === 'advertisements'
								? { color: '#f24594' }
								: { color: 'black' }
						}
					/>
				)}
				<span
					style={
						isDesktop
							? { color: 'white' }
							: currentTab === 'advertisements'
								? { color: '#f24594' }
								: { color: 'black' }
					}
				>
					{t('advertisements.benefits')}
				</span>
			</NavigationBarLink>
			<NavigationBarLink linkTo="/chat">
				{isDesktop ? (
					<IoChatboxEllipsesOutline
						size={28}
						style={{ color: 'white' }}
					/>
				) : (
					<>
						<div
							style={{
								position: 'relative',
								display: 'inline-block',
							}}
						>
							{isUnreadMessages && (
								<span
									style={{
										position: 'absolute',
										top: '-1px',
										right: '-2px',
										width: '8px',
										height: '8px',
										backgroundColor: '#f24594',
										borderRadius: '50%',
									}}
								></span>
							)}
							<IoChatboxEllipsesOutline
								size={28}
								style={
									currentTab === 'chat'
										? { color: '#f24594' }
										: { color: 'black' }
								}
							/>
						</div>
					</>
				)}

				<span
					style={
						isDesktop
							? { color: 'white' }
							: currentTab === 'chat'
								? { color: '#f24594' }
								: { color: 'black' }
					}
				>
					{t('general.messages')}
				</span>
			</NavigationBarLink>
			{user ? (
				<NavigationBarLink linkTo="/profile">
					{isDesktop ? (
						<IoPersonOutline size={28} style={{ color: 'white' }} />
					) : (
						<IoPersonOutline
							size={28}
							style={
								currentTab === 'profile'
									? { color: '#f24594' }
									: { color: 'black' }
							}
						/>
					)}
					<span
						style={
							isDesktop
								? { color: 'white' }
								: currentTab === 'profile'
									? { color: '#f24594' }
									: { color: 'black' }
						}
					>
						{t('general.profile')}
					</span>
				</NavigationBarLink>
			) : (
				<NavigationBarLink linkTo="/login">
					{isDesktop ? (
						<IoPersonOutline size={28} style={{ color: 'white' }} />
					) : (
						<IoPersonOutline
							size={28}
							style={
								currentTab === 'login'
									? { color: '#f24594' }
									: { color: 'black' }
							}
						/>
					)}
					<span
						style={
							isDesktop
								? { color: 'white' }
								: currentTab === 'login'
									? { color: '#f24594' }
									: { color: 'black' }
						}
					>
						{t('general.login_simple')}
					</span>
				</NavigationBarLink>
			)}
		</NavigationBarWrapper>
	);
};

export default NavigationBar;
