import React from 'react';
import ChatConversation from './ChatConversation';
import { useParams } from 'react-router-dom';
import api from '@src/api';
import { useQuery } from '@tanstack/react-query';
import View from '@src/components/layout/View';

const ChatConversationProvider = ({
	user,
}: {
	user: UserInterface;
}): JSX.Element => {
	const { chatID: chatIDFromParams } = useParams();
	const chatID = parseInt(chatIDFromParams || '0');

	const { data: chat, isPending } = useQuery({
		queryKey: ['chat', chatID],
		queryFn: () => api.chats.getSingle(chatID),
	});

	if (isPending || !chat || !user) {
		return <></>;
	}

	if (!user) {
		return <View requireLogin />;
	}

	return (
		<ChatConversation
			chatData={chat}
			user={user}
			receiverInfo={
				user.userID === chat.user1ID ? chat.user2 : chat.user1
			}
		></ChatConversation>
	);
};

export default ChatConversationProvider;
