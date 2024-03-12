import React, { useCallback, useEffect } from 'react';
import { ChatName } from './ChatName';
import { IoLocation } from 'react-icons/io5';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

type Props = {
	chatsWithEvents: ChatsWithEventsInterface[];
	userID: number;
	event: EventInterface;
};

function EventListElement({
	chatsWithEvents,
	userID,
	event,
}: Props): JSX.Element {
	const [visible, setVisible] = React.useState<boolean>(false);
	const [allUnreadMessages, setAllUnreadMessages] = React.useState<number>(0);

	const getAllUnreadMessages = useCallback((): void => {
		const messages = chatsWithEvents
			.map(chat => chat.chat.messages)
			.flat();

		const isSender = (message: MessageInterface): boolean =>
			message.senderID === userID;

		const unreadMessages = messages
			.filter(message => isSender(message) === false)
			.filter(message => message.isRead === false).length;
		setAllUnreadMessages(unreadMessages);
	}, [chatsWithEvents, userID]);

	useEffect(() => {
		getAllUnreadMessages();
	}, [getAllUnreadMessages]);

	const handleClick = (): void => {
		setVisible(!visible);
	};

	return (
		<>
			{visible ? (
				<div
					style={{ backgroundColor: 'white' }}
					className="border rounded p-2 align-items-center justify-content-between shadow-sm"
				>
					<div
						className="d-flex justify-content-between align-items-center w-100 pb-2 border-bottom"
						onClick={handleClick}
					>
						<div>
							<label style={{ fontWeight: '600' }}>
								{event.name}
							</label>
							<div
								className="text-start d-flex align-items-center d-flex"
								style={{
									color: 'grey',
									marginLeft: '-4px',
								}}
							>
								<IoLocation
									size={20}
									style={{ color: '#f24594' }}
								/>
								{event.location}
							</div>
						</div>
						<div className="d-flex gap-2">
							{allUnreadMessages > 0 && (
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
									{allUnreadMessages}
								</div>
							)}
							<RiArrowUpSFill size={20} />
						</div>
					</div>
					{chatsWithEvents?.length > 0 &&
						chatsWithEvents
							.sort((a, b) => {
								if (
									a.chat.messages.length > 0 &&
									b.chat.messages.length > 0
								) {
									const aDate = new Date(
										a.chat.messages[
											a.chat.messages.length - 1
										].created_at,
									);
									const bDate = new Date(
										b.chat.messages[
											b.chat.messages.length - 1
										].created_at,
									);

									return bDate.getTime() - aDate.getTime();
								} else {
									return 0;
								}
							})
							.map(chat => (
								<ChatName
									chat={chat.chat}
									userID={userID}
									key={chat.chat.chatID}
								/>
							))}
				</div>
			) : (
				<>
					<div
						style={{ backgroundColor: 'white' }}
						className="border rounded p-2 align-items-center justify-content-between shadow-sm"
						onClick={handleClick}
					>
						<div className="d-flex justify-content-between align-items-center w-100">
							<div>
								<label style={{ fontWeight: '600' }}>
									{event.name}
								</label>
								<div
									className="text-start align-items-center d-flex my-2"
									style={{
										color: 'grey',
										marginLeft: '-4px',
									}}
								>
									<IoLocation
										size={20}
										style={{ color: '#f24594' }}
									/>
									{event.location}
								</div>
							</div>
							<div className="d-flex gap-2">
								{allUnreadMessages > 0 && (
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
										{allUnreadMessages}
									</div>
								)}
								<RiArrowDownSFill size={20} />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default EventListElement;
