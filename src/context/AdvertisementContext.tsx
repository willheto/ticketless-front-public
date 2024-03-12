import React, { ReactNode, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@src/api';

interface AdvertisementContextProps {
	advertisements: AdvertisementInterface[];
	isPending: boolean;
	toastAdvertisement?: AdvertisementInterface;
	getLocalAdvertisements?: (location: string) => AdvertisementInterface[];
	globalAdvertisements?: AdvertisementInterface[];
}

export const AdvertisementContext = createContext<AdvertisementContextProps>({
	advertisements: [],
	isPending: true,
	toastAdvertisement: undefined,
	getLocalAdvertisements: undefined,
	globalAdvertisements: [],
});

interface AdvertisementContextProviderProps {
	children: ReactNode;
}

const AdvertisementContextProvider: React.FC<
	AdvertisementContextProviderProps
> = ({ children }) => {
	const { data, isPending } = useQuery({
		queryKey: ['advertisements'],
		queryFn: () => api.advertisements.getAllActive(),
	});

	// Randomize the order of the advertisements
	const advertisements: AdvertisementInterface[] = data?.sort(
		() => Math.random() - 0.5,
	);

	const globalAdvertisements = advertisements?.filter(
		ad => ad.type === 'global',
	);

	const toastAdvertisement = advertisements?.find(ad => ad.type === 'toast');

	const getLocalAdvertisements = (
		location: string,
	): AdvertisementInterface[] => {
		return advertisements?.filter(ad => ad.location === location);
	};

	return (
		<AdvertisementContext.Provider
			value={{
				advertisements,
				toastAdvertisement,
				isPending,
				getLocalAdvertisements,
				globalAdvertisements,
			}}
		>
			{children}
		</AdvertisementContext.Provider>
	);
};

export default AdvertisementContextProvider;
