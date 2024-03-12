import RegisterForm from '@src/views/authentication/RegisterForm';
import Event from '@src/views/event/Event';
import Home from '@src/views/home/Home';
import NewListing from '@src/views/listing/ListingForm';
import Listings from '@src/views/profile/Listings';
import Profile from '@src/views/profile/Profile';
import ProfileDetails from '@src/views/profile/ProfileDetails';
import Settings from '@src/views/profile/settings/Settings';
import TermsAndPolicies from '@src/views/profile/termsAndPolicies/TermsAndPolicies';
import TicketDetails from '@src/views/ticket/TicketDetails';
import Chat from '@src/views/chat/chatPage/Chat';
import ChatConversationProvider from '@src/views/chat/chatConversation/ChatConversationProvider';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Support from '@src/views/profile/support/Support';
import { PrivacyPolicyPage } from '@src/views/profile/termsAndPolicies/PrivacyPolicy';
import { TermsPage } from '@src/views/profile/termsAndPolicies/Terms';
import CouponsPage from '@src/views/advertisements/CouponsPage';
import { useUser } from '@src/context/UserContext';
import LoginForm from '@src/views/authentication/LoginForm';
import NotFound from '@src/components/layout/NotFound';

/**
 * Redirects to /events
 * @returns
 */
const Redirect = (): JSX.Element => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/events');
	}, [navigate]);
	return <div></div>;
};

const AppRoutes = (): JSX.Element => {
	const { user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		const ticketlessAuthToken = localStorage.getItem('ticketlessAuthToken');
		const pathIsProfile = window.location.pathname.includes('/profile');
		if (!ticketlessAuthToken && pathIsProfile) {
			navigate('/login');
		}
	}, [navigate, window.location.pathname]);

	return (
		<Routes>
			<Route path="/" element={<Redirect />} />
			<Route path="login" element={<LoginForm />} />
			<Route path="events" element={<Home />} />
			<Route path="events/:eventID" element={<Event />} />
			<Route path="newListing" element={<NewListing />} />
			<Route path="advertisements" element={<CouponsPage />} />
			<Route path="chat" element={<Chat />} />
			<Route path="register" element={<RegisterForm />} />
			<Route path="tickets/:ticketID" element={<TicketDetails />} />
			<Route path="profile/support" element={<Support />} />
			<Route
				path="profile/terms-and-policies/terms"
				element={<TermsPage />}
			/>
			<Route
				path="profile/terms-and-policies/privacy-policy"
				element={<PrivacyPolicyPage />}
			/>

			<Route
				path="profile/terms-and-policies/"
				element={<TermsAndPolicies />}
			/>

			{/* These routes require user authentication */}
			{user && <Route path="profile" element={<Profile user={user} />} />}
			{user && (
				<Route
					path="chat/:chatID"
					element={<ChatConversationProvider user={user} />}
				/>
			)}
			{user && (
				<Route
					path="profile/settings"
					element={<Settings user={user} />}
				/>
			)}
			{user && (
				<Route
					path="profile/listings"
					element={<Listings user={user} />}
				/>
			)}
			{user && (
				<Route
					path="profile/details"
					element={<ProfileDetails user={user} />}
				/>
			)}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
