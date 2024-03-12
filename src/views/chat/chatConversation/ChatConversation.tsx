import React, { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '@src/api';
import { useParams } from 'react-router-dom';
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { CSSProp } from 'styled-components';
import blueMedium from '@src/assets/blueMedium.svg';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@src/index';
import { MessageStyle } from '../StyledComponents';
import MessageSender from './MessageSender';
import InfoModal from '@src/components/infoModal/InfoModal';
import ChatInfo from './ChatInfo';
import View from '@src/components/layout/View';

// https://developer.vippsmobilepay.com/docs/knowledge-base/qr-code/#personal-qr
const mobilePayLinkString = 'https://qr.mobilepay.fi/28/2/01/031/';
const mobilePayLinkVersionString = '?v=1';

/**
 * This is a workaround for styled-components not working with react-bootstrap
 */
declare module 'react' {
	interface Attributes {
		css?: CSSProp;
	}
}

declare const WEBSOCKET_URL: string;
const socket = io(WEBSOCKET_URL);

const ChatWindow = ({
	chatData,
	user,
	receiverInfo,
}: {
	chatData: ChatDataInterface;
	user: UserInterface;
	receiverInfo: UserInterface;
}): JSX.Element => {
	const { t } = useTranslation();
	const { chatID: chatIDFromParams } = useParams();
	const chatID = parseInt(chatIDFromParams || '0');
	const { messages } = chatData;

	const [messageContent, setMessageContent] = useState<string>('');
	const [receiverIsTyping, setReceiverIsTyping] = useState<boolean>(false);
	const [isSending, setIsSending] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(messages?.length === 0);

	/**
	 * Scroll to the bottom of the chat window
	 */
	const scrollToBottom = (smooth?: boolean): void => {
		const chatWindow = document.getElementById('view-content');
		if (chatWindow) {
			chatWindow.scrollTo({
				top: chatWindow.scrollHeight,
				behavior: smooth ? 'smooth' : 'auto',
			});
		}
	};

	/**
	 * When typing, send a typing event to the socket
	 * If the user stops typing, send a notTyping event to the socket
	 */
	useEffect(() => {
		if (!messageContent) return;
		socket.emit('typing', { chatID });

		// If the user stops typing, send a notTyping event to the socket
		const typingTimeout = setTimeout(() => {
			socket.emit('stopTyping', { chatID });
		}, 1000);

		return () => {
			clearTimeout(typingTimeout);
		};
	}, [messageContent, chatID]);

	/**
	 * Socket stuff
	 */
	useEffect(() => {
		socket.on('receiveMessage', (message: MessageInterface): void => {
			if (message.chatID === chatID) {
				queryClient.setQueryData(
					['chat', chatID],
					(oldData: ChatDataInterface) => {
						const newData = {
							...oldData,
							messages: [...oldData.messages, message],
						};
						return newData;
					},
				);
			}
		});

		// When the receiver reads the message, update the message status
		socket.on('messagesRead', (data: ChatInterface): void => {
			if (data.chatID === chatID) {
				queryClient.setQueryData(
					['chat', chatID],
					(oldData: ChatInterface) => {
						return {
							...oldData,
							messages: data.messages,
						};
					},
				);
			}
		});

		// When the receiver is typing, show the typing indicator
		socket.on('typing', (data: ChatInterface): void => {
			if (data.chatID === chatID) {
				setReceiverIsTyping(true);
				// Scroll to bottom after the typing indicator is shown
			}
		});

		// When the receiver stops typing, hide the typing indicator
		socket.on('stopTyping', (data: ChatInterface): void => {
			if (data.chatID === chatID) {
				setReceiverIsTyping(false);
			}
		});
	}, [chatID]);

	/**
	 * Scroll to bottom when the typing indicator is shown
	 */
	useEffect(() => {
		if (receiverIsTyping) {
			// Only scroll to the bottom if the user is 100px or less from the bottom
			const chatWindow = document.getElementById('view-content');
			if (chatWindow) {
				const scrollBottom =
					chatWindow.scrollHeight -
					chatWindow.scrollTop -
					chatWindow.clientHeight;
				if (scrollBottom <= 50) {
					scrollToBottom();
				}
			}
		}
	}, [receiverIsTyping]);

	useEffect(() => {
		// Join the chat when the component mounts
		joinChat(chatID);

		// Return a cleanup function that leaves the chat when the component unmounts
		return () => {
			leaveChat(chatID);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatID, receiverInfo]);

	/**
	 * Sets all messages from the sender in the chat as read. This is done when the user opens the chat window.
	 * Using basecontroller update chat
	 */
	const setMessagesRead = useCallback(async (): Promise<void> => {
		if (!chatData) return;

		try {
			const senderID =
				chatData.user1ID === user?.userID
					? chatData.user2ID
					: chatData.user1ID;

			const payload = {
				senderID: senderID,
				chatID: chatID,
			};

			const response = await api.messages.setMessagesRead(payload);

			socket.emit('setMessagesRead', response.message);
		} catch (error) {
			console.log(error);
		}
	}, [chatID, chatData, user?.userID]);

	/**
	 * Join the chat on socket
	 * @param chat
	 */
	const joinChat = (chatID: number): void => {
		socket.emit('joinChat', chatID);
		if (receiverInfo?.userID) {
			socket.emit('joinUserChat', receiverInfo?.userID);
		}
	};

	const leaveChat = (chatID: number): void => {
		socket.emit('leaveChat', chatID);
	};

	const convertToInternationalFormat = (phoneNumber: string): string => {
		if (phoneNumber.startsWith('358')) return phoneNumber;
		if (phoneNumber.startsWith('+')) return phoneNumber.replace('+', '');
		if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '358');
		return phoneNumber;
	};

	/**
	 * Save the message to DB and send it to the socket
	 * @param mobilePay If the message is a mobilepay link, set this to true
	 * @returns
	 */
	const sendMessage = async (mobilePay: boolean): Promise<void> => {
		socket.emit('stopTyping', { chatID });

		try {
			if (!chatID || !chatData || !user?.userID) {
				return;
			}

			if (messageContent.length === 0 && !mobilePay) return;

			setIsSending(true);

			const receiverID =
				chatData.user1ID === user.userID
					? chatData.user2ID
					: chatData.user1ID;

			const payload = {
				chatID: chatID,
				senderID: user.userID,
				receiverID: receiverID,
				content:
					mobilePay === true
						? `${mobilePayLinkString}${convertToInternationalFormat(
								user.phoneNumber,
							)}${mobilePayLinkVersionString}`
						: messageContent,
			};

			const sentMessage = await api.messages.createMessage(
				payload,
				chatID,
			);

			socket.emit('sendMessage', sentMessage.message);

			api.push.sendPushNotification({
				senderName: user.firstName + ' ' + user.lastName,
				senderID: user.userID,
				receiverID,
				content: sentMessage.message.content.includes(
					mobilePayLinkString,
				)
					? 'Mobilepay linkki'
					: sentMessage.message.content,
				chatID: chatID,
				baseUrl:
					ENVIRONMENT === 'local'
						? 'http://localhost:9001'
						: ENVIRONMENT === 'development'
							? 'https://dev-app.ticketless.fi'
							: 'https://app.ticketless.fi',
			});

			queryClient.setQueryData(
				['chat', chatID],
				(oldData: ChatInterface) => {
					return {
						...oldData,
						messages: [...oldData.messages, sentMessage.message],
					};
				},
			);
			setMessageContent('');
			setIsSending(false);
		} catch (error) {
			console.log(error);
			setIsSending(false);
		}
	};

	useEffect(() => {
		const chatWindow = document.getElementById('view-content');
		if (chatWindow) {
			const initialScroll = (): void => {
				scrollToBottom();
			};
			setTimeout(initialScroll, 100);
		}
	}, [receiverInfo]);

	/**
	 * Set messages as read when the user opens the chat window
	 */
	useEffect(() => {
		const chatWindow = document.getElementById('view-content');
		if (chatWindow) {
			const scrollBottom =
				chatWindow.scrollHeight -
				chatWindow.scrollTop -
				chatWindow.clientHeight;
			if (scrollBottom <= 100) {
				scrollToBottom(true);
			}
		}
		setMessagesRead();
	}, [messages.length, chatData, setMessagesRead]);

	/**
	 * Get message timestamp in format hh:mm
	 */
	const getTimeStamp = (date: string): string => {
		const dateObject = new Date(date);
		const hours = dateObject.getHours();
		const minutes = dateObject.getMinutes();
		return `${hours < 10 ? '0' + hours : hours}:${
			minutes < 10 ? '0' + minutes : minutes
		}`;
	};

	const topBarProps = {
		header: receiverInfo?.firstName + ' ' + receiverInfo?.lastName,
		customContent: (
			<ChatInfo chatData={chatData} isMessages={messages.length > 0} />
		),
	};

	if (!user) {
		return <View requireLogin />;
	}

	return (
		<View
			topBarProps={topBarProps}
			customToolBar={
				<MessageSender
					messageContent={messageContent}
					sendMessage={sendMessage}
					setMessageContent={setMessageContent}
					isSending={isSending}
					scrollToBottom={scrollToBottom}
					user={user}
					receiverID={receiverInfo?.userID}
				/>
			}
		>
			{
				// If no messages have been sent, show a modal with security tips
				messages.length === 0 && (
					<InfoModal
						showModal={showModal}
						setShowModal={setShowModal}
						content={`${t('chat.chatCheaterNotice')} ${t(
							'chat.chatCheaterNotice2',
						)} `}
						title={`${t('chat.chatGreeting')} ${user?.firstName}!`}
					/>
				)
			}
			<div className="h-100 d-flex flex-column justify-content-between">
				<div className="d-flex flex-column h-100" id="chatWindow">
					<MessageStyle>
						<div className="message">
							{messages?.map((message, index) => {
								if (!message?.content) return null;
								// Check if the current message is the last message from the same sender. Not including mobilepay links
								const isLastMessageFromSameSender =
									index === messages.length - 1 ||
									messages[index + 1].senderID !==
										message.senderID ||
									messages[index + 1].content.includes(
										mobilePayLinkString,
									);

								return (
									<React.Fragment key={index}>
										{message.senderID === user.userID ? (
											<>
												{message.content.includes(
													mobilePayLinkString,
												) ? (
													<div
														className="align-self-end d-flex flex-column"
														style={{
															marginTop:
																'0.25rem',
															marginBottom:
																'0.25rem',
														}}
													>
														<div className="text-end">
															{t(
																'chat.youSentMPLink',
															)}
														</div>
														<img
															src={blueMedium}
															onClick={() =>
																window.open(
																	message.content,
																)
															}
														/>
													</div>
												) : (
													<div
														className={
															!isLastMessageFromSameSender
																? 'from-me no-tail container'
																: 'from-me container'
														}
													>
														{message.content}
														<div
															className="justify-content-end d-flex align-items-center gap-1"
															style={{
																fontSize:
																	'0.8rem',
																fontWeight: 300,
															}}
														>
															{getTimeStamp(
																message.created_at,
															)}
															{message.isRead ? (
																<IoCheckmarkDoneSharp
																	size={16}
																/>
															) : (
																<IoCheckmarkSharp
																	size={16}
																/>
															)}
														</div>
													</div>
												)}
											</>
										) : (
											<>
												{message.content.includes(
													mobilePayLinkString,
												) ? (
													<div
														className="align-self-start d-flex flex-column"
														style={{
															marginTop:
																'0.25rem',
															marginBottom:
																'0.25rem',
														}}
													>
														<div>
															{
																receiverInfo?.firstName
															}{' '}
															{t(
																'chat.otherUserSentMPLink',
															)}
														</div>
														<img
															src={blueMedium}
															onClick={() =>
																window.open(
																	message.content,
																	'_blank',
																)
															}
														/>
													</div>
												) : (
													<div
														className={
															!isLastMessageFromSameSender
																? 'from-them no-tail container'
																: 'from-them container'
														}
													>
														{message.content}

														<div
															className="justify-content-end d-flex"
															style={{
																fontSize:
																	'0.8rem',
																fontWeight: 300,
															}}
														>
															{getTimeStamp(
																message.created_at,
															)}
														</div>
													</div>
												)}
											</>
										)}
									</React.Fragment>
								);
							})}
						</div>
					</MessageStyle>
				</div>
			</div>
		</View>
	);
};

export default ChatWindow;
