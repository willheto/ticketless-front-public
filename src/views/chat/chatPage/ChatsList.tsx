import React from 'react';
import { ChatName } from './ChatName';
import { useTranslation } from 'react-i18next';

const ChatsList = ({
	chats,
	userID,
}: {
	chats: ChatInterface[];
	userID: number;
}): JSX.Element => {
	const { t } = useTranslation();

	if (chats.length === 0) {
		return (
			<div className="d-flex flex-column align-items-center mt-4">
				{t('chat.noChats')}
			</div>
		);
	}

	const sortChats = (a: ChatInterface, b: ChatInterface): number => {
		// chat with newest message first
		const lastMessageA = a.messages[a.messages.length - 1];
		const lastMessageB = b.messages[b.messages.length - 1];
		if (!lastMessageA || !lastMessageB) return 0;
		return lastMessageB.created_at.localeCompare(lastMessageA.created_at);
	};

	return (
		<div>
			{chats.sort(sortChats).map(chat => {
				return (
					<ChatName chat={chat} userID={userID} key={chat.chatID} />
				);
			})}
		</div>
	);
};

export default ChatsList;
