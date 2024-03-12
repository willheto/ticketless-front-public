import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/root/Root';
import '../i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdvertisementContextProvider from './context/AdvertisementContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');
const root = ReactDOM.createRoot(rootElement);
export const queryClient = new QueryClient();

root.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<AdvertisementContextProvider>
				<Root />
			</AdvertisementContextProvider>
		</QueryClientProvider>
	</BrowserRouter>,
);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js');
}
