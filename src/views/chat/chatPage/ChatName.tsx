import React, { useState, useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const ChatName = ({
	chat,
	userID,
}: {
	chat: ChatInterface;
	userID: number;
}): JSX.Element => {
	const navigate = useNavigate();
	const [unreadMessages, setUnreadMessages] = useState<number>(0);

	const receiver = chat.user1.userID === userID ? chat.user2 : chat.user1;

	/**
	 * Get the last message from or to the user
	 */
	const getLastMessage = (): string | null => {
		if (chat.messages.length === 0) return null;
		const messages = chat.messages;
		const lastMessage = messages[messages.length - 1];
		if (lastMessage.senderID === userID) {
			return 'Sinä: ' + lastMessage.content;
		} else {
			return lastMessage.content;
		}
	};

	/**
	 * Get the time of the last message. If the message was sent today, show hh:MM , otherwise show the date dd.mm
	 */
	const getLastMessageTime = (): string | null => {
		if (chat.messages.length === 0) return null;
		const messages = chat.messages;
		const lastMessage = messages[messages.length - 1];
		const date = new Date(lastMessage.created_at);
		const today = new Date();
		if (date.getDate() === today.getDate()) {
			return date.toLocaleTimeString('fi-FI', {
				hour: 'numeric',
				minute: 'numeric',
			});
		} else {
			return date.toLocaleDateString('fi-FI', {
				day: 'numeric',
				month: 'numeric',
			});
		}
	};

	const checkUnreadMessages = useCallback((): void => {
		const unreadMessages = chat.messages.filter(
			(message: MessageInterface) =>
				message.isRead === false && message.receiverID === userID,
		);
		if (unreadMessages.length > 0) {
			setUnreadMessages(unreadMessages.length);
		}
	}, [chat.messages, userID, setUnreadMessages]);

	useEffect(() => {
		checkUnreadMessages();
	}, [checkUnreadMessages]);

	return (
		<div
			style={{ backgroundColor: 'white', cursor: 'pointer' }}
			className={'d-flex mt-2 p-2 border rounded shadow-sm'}
			onClick={() => navigate(`${chat.chatID}`)}
		>
			{receiver.profilePicture ? (
				<img
					src={receiver.profilePicture}
					style={{
						objectFit: 'scale-down',
						width: '50px',
						height: '50px',
						minWidth: '50px',
						borderRadius: '50%',
					}}
				/>
			) : (
				<Avatar
					className="align-self-center"
					name={receiver.firstName + ' ' + receiver.lastName}
					size="50"
					round={true}
					color="#f24594"
				/>
			)}
			<div className="ps-2 pb-2 w-100 d-flex flex-column overflow-auto">
				<div className="d-flex justify-content-between">
					<Form.Label>
						{receiver.firstName + ' ' + receiver.lastName}
					</Form.Label>
					{getLastMessageTime()}
				</div>
				<div className="d-flex justify-content-between position-relative">
					<span
						style={{
							overflow: 'hidden',
							wordBreak: 'break-word',
						}}
					>
						{getLastMessage()}
					</span>
					<div>
						{unreadMessages > 0 && (
							<div
								className="rounded-circle d-flex justify-content-center align-items-center"
								style={{
									color: 'white',
									top: '0px',
									right: '0px',
									width: '22px',
									height: '22px',
									backgroundColor: 'red',
									fontSize: '12px',
								}}
							>
								{unreadMessages}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { ChatName };
