import React from 'react';
import api from '@src/api';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';

const ChatInfo = ({
	chatData,
	isMessages,
}: {
	chatData?: ChatDataInterface;
	isMessages: boolean;
}): JSX.Element => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const ticket = chatData?.ticket;

	const updateChatActiveStatus = async (): Promise<void> => {
		try {
			await api.chats.patch({
				chatID: chatData?.chatID,
				isActive: !chatData?.isActive,
			});

			navigate('/chat');
			toast(
				chatData?.isActive
					? t('chat.chatArchived')
					: t('chat.chatActivated'),
			);
		} catch (error) {
			toast(t('chat.archiveFailed'));
			console.log(error);
		}
	};

	return (
		<div className="my-2 d-flex align-items-center w-100 justify-content-between">
			<div style={{ width: '24px' }}></div>
			<div className="justify-content-between d-flex flex-column overflow-hidden">
				<span
					style={{
						fontWeight: 600,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{ticket?.header}
				</span>
			</div>
			<div
				onClick={() => {
					if (ticket) {
						updateChatActiveStatus();
					}
				}}
			>
				{isMessages &&
					(chatData?.isActive ? (
						<BiArchiveIn
							style={
								ticket
									? { fontSize: '24px' }
									: {
											fontSize: '24px',
											color: '#EBEBE4',
										}
							}
						/>
					) : (
						<BiArchiveOut
							style={
								ticket
									? { fontSize: '24px' }
									: {
											fontSize: '24px',
											color: '#EBEBE4',
										}
							}
						/>
					))}
			</div>
		</div>
	);
};

export default ChatInfo;
