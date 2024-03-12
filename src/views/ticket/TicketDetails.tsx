import React, { useCallback, useEffect, useState } from 'react';
import api from '@src/api';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NewListing from '../listing/ListingForm';
import { IoCash, IoTicket, IoTrashOutline } from 'react-icons/io5';
import Share from './Share';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';
import { useUser } from '@src/context/UserContext';

const TicketDetails = (): JSX.Element => {
	const { t } = useTranslation();
	const [ticket, setTicket] = useState<TicketInterface>();
	const [seller, setSeller] = useState<UserInterface>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showShareModal, setShowShareModal] = useState<boolean>(false);
	const [isPending, setIsPending] = useState<boolean>(true);
	const { user } = useUser();

	const navigate = useNavigate();
	const { ticketID: ticketIDFromParams } = useParams();
	const ticketID = Number(ticketIDFromParams);

	// TODO: use react-query and get the seller as related data

	const fetchData = useCallback(async (): Promise<void> => {
		setIsPending(true);
		try {
			if (!ticketID) return;
			const ticketResponse = await api.tickets.getSingle(ticketID);
			setTicket(ticketResponse);
			if (user?.userID && ticketResponse) {
				const sellerResponse = await api.users.getSingle(
					ticketResponse.userID,
				);
				setSeller(sellerResponse);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsPending(false);
		}
	}, [ticketID, user?.userID]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	/**
	 * Set ticket quantity one less than the current quantity
	 */
	const handleTicketSold = async (): Promise<void> => {
		try {
			if (ticketID && ticket) {
				const payload = {
					ticketID: ticketID,
					quantity: ticket.quantity - 1,
				};
				const response = await api.tickets.save(payload);
				setTicket(response.ticket);
				toast(t('listing.ticketSoldToast'));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (): Promise<void> => {
		try {
			if (!user) return;
			if (ticketID) {
				await api.tickets.deleteSingle(ticketID, user.userID);
				navigate('/profile/listings');
				toast(t('listing.listingRemoved'));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkChatExists = async (): Promise<boolean> => {
		try {
			if (!user) return false;
			const response = await api.chats.getAllByUserID(user.userID);
			const chat = response.find((chat: ChatInterface) => {
				return chat.ticketID === ticketID;
			});

			if (chat) {
				navigate(`/chat/${chat.chatID}`);
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const handleCreateChat = async (): Promise<void> => {
		try {
			if (ticketID && user) {
				// Check if chat already exists
				const chatExists = await checkChatExists();
				if (chatExists) return;

				// Create chat
				const payload = {
					user2ID: ticket?.userID,
					ticketID: ticket?.ticketID,
				};
				const response = await api.chats.create(payload);

				navigate(`/chat/${response.chat.chatID}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View
			suspend={isPending}
			topBarProps={{
				header:
					!isPending && ticket?.header
						? ticket?.header
						: t('general.ticket'),
				allowShare: true,
				onShare: () => setShowShareModal(true),
			}}
		>
			<div className="h-100 d-flex flex-column">
				<Modal
					show={showShareModal}
					onHide={() => setShowShareModal(false)}
					centered
				>
					<Share />
				</Modal>
				<Modal
					centered
					show={showEditModal}
					onHide={() => setShowEditModal(false)}
				>
					{seller && (
						<NewListing
							ticketData={ticket}
							onSuccess={ticket => {
								setShowEditModal(false);

								setTicket(ticket);
							}}
							onClose={() => setShowEditModal(false)}
							isSelling={ticket?.isSelling}
						/>
					)}
				</Modal>
				<Modal
					centered
					show={showModal}
					onHide={() => {
						setShowModal(false);
					}}
				>
					<div className="p-4 d-flex flex-column">
						<div className="align-self-center pb-4">
							<IoTrashOutline size={55} />
						</div>
						<Form.Group className="text-center">
							<h3>{t('listing.removeListing')}</h3>
							{t('listing.removeListingModalDescription')}
						</Form.Group>

						<div className="d-flex mt-4">
							<Button
								onClick={() => setShowModal(false)}
								variant="secondary"
								className="w-100 me-2"
							>
								{t('general.cancel')}
							</Button>
							<Button
								onClick={() => handleDelete()}
								className="btn-pink w-100"
							>
								{t('general.delete')}
							</Button>
						</div>
					</div>
				</Modal>

				{ticket && (
					<div className="d-flex flex-column">
						<div>
							<div className="d-flex flex-column gap-2">
								<div className="d-flex justify-content-between">
									{ticket?.isSelling && (
										<div className="d-flex justify-content-center align-items-center gap-1">
											<IoCash size={20} color="#f24594" />
											<Form.Label>
												{ticket?.price}{' '}
												{t(
													'general.ticketPriceSuffixLabel',
												)}
											</Form.Label>
										</div>
									)}

									<div className="d-flex justify-content-center align-items-center gap-1">
										<IoTicket size={20} color="#f24594" />
										<Form.Label>
											{ticket?.quantity}{' '}
											{ticket?.quantity > 1 ? (
												<>
													{ticket.isSelling
														? t(
																'listing.ticketsLeft',
															)
														: t('listing.tickets')}
												</>
											) : (
												<>
													{ticket.isSelling
														? t(
																'listing.ticketLeft',
															)
														: t('listing.ticket')}
												</>
											)}
										</Form.Label>
									</div>
								</div>
							</div>
							{ticket.description !== '' && (
								<div className="mt-4">
									{ticket.isSelling ? (
										<h4>
											{t('listing.ticketInformation')}
										</h4>
									) : (
										<h4>
											{t('listing.additionalInformation')}
										</h4>
									)}

									<div
										style={{
											wordBreak: 'break-word',
										}}
									>
										{ticket?.description}
									</div>
								</div>
							)}
							{user?.userID && (
								<div className="mt-4">
									{ticket.isSelling ? (
										<h4>{t('listing.sellerName')}</h4>
									) : (
										<h4>{t('listing.buyerName')}</h4>
									)}
									<div className="mt-2 d-flex flex-column">
										<div>
											<span>
												{seller?.firstName +
													' ' +
													seller?.lastName}
											</span>
										</div>
									</div>
								</div>
							)}
						</div>
						{user?.userID && user?.userID === seller?.userID ? (
							<div className="mt-4 d-flex flex-column gap-2">
								{ticket?.quantity > 1 && (
									<Button
										className="btn-pink"
										onClick={() => handleTicketSold()}
									>
										{t('listing.markOneTicketAsSold')}
									</Button>
								)}
								<Button
									className="btn-pink"
									onClick={() => setShowEditModal(true)}
								>
									{t('listing.editListing')}
								</Button>
								<Button
									className="btn-pink"
									onClick={() => setShowModal(true)}
								>
									{t('listing.removeListing')}
								</Button>
							</div>
						) : user ? (
							<div className="mt-4 d-flex flex-column gap-2">
								<Button
									className="btn-pink"
									onClick={() => handleCreateChat()}
								>
									{t('listing.sendMessage')}
								</Button>
							</div>
						) : (
							<div className="mt-4 d-flex flex-column gap-2">
								<Form.Group className="text-center">
									{t('listing.loginToChat')}
								</Form.Group>
								<Form.Group className="mt-2 text-center">
									<Button
										onClick={() => navigate('/login')}
										className="btn-pink"
									>
										{t('general.login')}
									</Button>
								</Form.Group>
							</div>
						)}
					</div>
				)}
			</div>
		</View>
	);
};

export default TicketDetails;
