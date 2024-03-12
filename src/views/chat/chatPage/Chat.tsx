import React, { useState } from 'react';
import api from '@src/api';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation } from 'react-i18next';
import ChatsList from './ChatsList';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@src/context/UserContext';
import View from '@src/components/layout/View';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
	flex: 1;
	max-width: 500px;
`;

const Chat = (): JSX.Element => {
	const { user } = useUser();
	const { t } = useTranslation();
	const [tabIndex, setTabIndex] = useState<number>(0);

	const changeTab = (index: number): void => {
		setTabIndex(index);
	};

	const { data: chats, isPending } = useQuery({
		queryKey: ['chats'],
		queryFn: () => {
			if (user?.userID) {
				return api.chats.getAllByUserID(user?.userID);
			}
			return [];
		},
		enabled: !!user?.userID,
	});

	const activeChats = chats
		?.filter((chat: ChatInterface) => chat.messages.length > 0)
		.filter((chat: ChatInterface) => chat.isActive === true);
	const archivedChats = chats
		?.filter((chat: ChatInterface) => chat.messages.length > 0)
		?.filter((chat: ChatInterface) => chat.isActive === false);

	const topBarProps = {
		header: t('chat.messages'),
		allowBack: false,
		customContent: (
			<StyledTabs
				onSelect={e => {
					changeTab(Number(e));
				}}
				activeKey={tabIndex}
				justify
				className={`tabs`}
			>
				<Tab eventKey={0} title={t('chat.active')} />
				<Tab eventKey={1} title={t('chat.archived')} />
			</StyledTabs>
		),
	};

	if (!user) {
		return (
			<View
				topBarProps={{ ...topBarProps, customContent: null }}
				requireLogin
			/>
		);
	}

	return (
		<View suspend={isPending} topBarProps={topBarProps}>
			{tabIndex === 0 ? (
				<ChatsList chats={activeChats} userID={user.userID} />
			) : (
				<ChatsList chats={archivedChats} userID={user.userID} />
			)}
		</View>
	);
};

export default Chat;

//
