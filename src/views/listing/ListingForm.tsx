import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '@src/api';
import { FormProvider, useForm } from 'react-hook-form';
import { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { IoPencilOutline } from 'react-icons/io5';
import { eventTypes } from '@src/assets/EventTypes';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import fi from 'date-fns/locale/fi';
import VerifyModal from './VerifyModal';
import SellingForm from './SellingForm';
import EventForm from './EventForm';
import BuyingForm from './BuyingForm';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@src/context/UserContext';
import TicketForm from './TicketForm';
import View from '@src/components/layout/View';

type PropTypes = {
	ticketData?: TicketInterface;
	event?: EventInterface;
	isSelling?: boolean;
	onSuccess?: (ticket: TicketInterface) => void;
	onClose?: () => void;
	disableVerifyModal?: boolean;
};
registerLocale('fi', fi);

const ListingForm = (props: PropTypes): JSX.Element => {
	const {
		ticketData,
		onSuccess,
		onClose,
		event,
		isSelling,
		disableVerifyModal,
	} = props;

	const { user } = useUser();
	const { t } = useTranslation();

	const { data: events, isPending } = useQuery({
		queryKey: ['events'],
		queryFn: () => api.events.getAll(),
		select: data =>
			data.filter((e: EventInterface) => e.status !== 'redirect'),
	});

	const [selectedEvent, setSelectedEvent] = useState<EventInterface>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const navigate = useNavigate();
	const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
	const ticket = ticketData || undefined;
	const [currentPhase, setCurrentPhase] = useState<number>(1);

	const methods = useForm({
		defaultValues: {
			isSelling: isSelling === true ? true : false,
			newEventName: '',
			location: '',
			type: '',
			date: '',
			price: ticket?.price ? ticket.price : null,
			description: ticket?.description ? ticket.description : '',
			header: ticket?.header ? ticket.header : '',
			quantity: ticket?.quantity ? ticket.quantity : 1,
			requiresMembership: ticket?.requiresMembership || false,
			association: ticket?.association,
		},
	});

	const {
		handleSubmit,
		setValue,
		watch,
		formState: { dirtyFields },
	} = methods;

	const readyForNextPhase =
		selectedEvent ||
		(watch('newEventName') &&
			watch('date') &&
			watch('location') &&
			watch('type'));

	const onEventSelect = (event: {
		value: string;
		label: string;
		__isNew__?: boolean;
	}): void => {
		if (event.__isNew__) {
			setSelectedEvent(undefined);
			setValue('newEventName', event.value);
		} else {
			setSelectedEvent(
				events.find((e: EventInterface) => e.name === event.value),
			);
		}
	};

	/**
	 * If an event is selected, set the values of the form to the values of the selected event.
	 */
	useEffect(() => {
		if (selectedEvent) {
			setValue('location', selectedEvent.location);
			setValue('type', selectedEvent.type);
			setValue('date', selectedEvent.date);
		} else {
			setValue('location', '');
			setValue('type', '');
			setValue('date', '');
		}
	}, [selectedEvent, setValue]);

	const topBarProps = { header: t('listing.newListing'), allowBack: false };

	if (!user) {
		return <View topBarProps={topBarProps} requireLogin />;
	}

	type EventFormType = {
		isSelling: boolean;
		newEventName: string;
		location: string;
		type: string;
		date: string;
		price: number;
		description: string;
		header: string;
		quantity: number;
		requiresMembership: boolean;
		association: string;
	};

	const onSubmit = async (data: EventFormType): Promise<void> => {
		if (!disableVerifyModal && !showVerifyModal && !ticket) {
			setShowVerifyModal(true);
			return;
		}

		if (selectedEvent || ticket || event) {
			setIsSubmitting(true);
			try {
				let ticketPayload: Partial<TicketInterface> = ticket
					? {
							ticketID: ticket.ticketID,
							eventID: ticket.eventID,
							userID: ticket.userID,
						}
					: event
						? { eventID: event.eventID, userID: user.userID }
						: {
								eventID: selectedEvent?.eventID,
								userID: user.userID,
							};

				const dirtyKeys = Object.keys(dirtyFields);

				// new ticket
				if (!ticket?.ticketID) {
					ticketPayload = {
						...ticketPayload,
						...data,
					};
				} else {
					// update ticket
					if (dirtyKeys.length) {
						for (const key of dirtyKeys) {
							ticketPayload[key] = data[key];
						}
					}
				}

				if (ticketPayload.price === null) {
					delete ticketPayload.price;
				}

				const response = await api.tickets.save(ticketPayload);
				toast(
					!ticket?.ticketID
						? t('listing.listingCreated')
						: t('listing.listingUpdated'),
				);
				setIsSubmitting(false);
				if (onSuccess) {
					onSuccess(response.ticket);
				} else {
					navigate('/events');
				}
			} catch (error) {
				console.log(error);
				setIsSubmitting(false);
			}
		} else {
			try {
				const eventPayload = {
					name: data.newEventName,
					location: data.location,
					type: data.type,
					date: data.date,
				};

				const response = await api.events.save(eventPayload);
				const ticketPayload = {
					eventID: response.event.eventID,
					userID: user.userID,
					price: data.price,
					description: data.description || '',
					header: data.header,
					quantity: data.quantity,
					requiresMembership: data.requiresMembership,
					association: data.association,
					isSelling: data.isSelling,
				};

				if (ticketPayload.price === null) {
					//@ts-expect-error price is not required
					delete ticketPayload.price;
				}

				await api.tickets.save(ticketPayload);
				toast('Ilmoitus luotu');
				setIsSubmitting(false);

				if (onSuccess) {
					onSuccess(response.ticket);
				} else {
					navigate('/events');
				}
			} catch (error) {
				console.log(error);
				setIsSubmitting(false);
			}
		}
	};

	const handleVerifiedSubmit = (): void => {
		handleSubmit(onSubmit)();
	};

	const customFilter = (
		option: {
			value: string;
			label: string;
		},
		inputValue: string,
	): boolean => {
		// Always show the option with value 'always-visible'
		if (option.value === 'other') {
			return true;
		}

		// Default filtering behavior for other options
		return option.label.toLowerCase().includes(inputValue.toLowerCase());
	};

	const eventsForSelect = events?.map((event: EventInterface) => {
		return {
			label: event.name,
			value: event.name,
		};
	});

	if (ticket || event) {
		return (
			<FormProvider {...methods}>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="p-3"
					style={{ maxWidth: '700px' }}
				>
					{ticket && (
						<div className="mb-4">
							<div className="d-flex justify-content-center pb-4">
								<IoPencilOutline size={55} />
							</div>
							<Form.Group className="text-center">
								<h3>{t('listing.editListing')}</h3>
							</Form.Group>
						</div>
					)}
					{event && (
						<div className="mb-4">
							<Form.Group className="text-center">
								<h3>
									{isSelling
										? t('listing.new_selling_listing')
										: t('listing.new_buying_request')}
								</h3>
							</Form.Group>
						</div>
					)}

					{isSelling ? (
						<SellingForm
							selectedEvent={selectedEvent || event}
							customFilter={customFilter}
						/>
					) : (
						<BuyingForm />
					)}
					<div className="d-flex">
						<Button
							className="w-100 d-flex justify-content-center align-items-center btn-secondary me-2"
							onClick={() => {
								if (onClose) onClose();
							}}
						>
							{t('general.cancel')}
						</Button>
						<Button
							className="w-100 d-flex justify-content-center align-items-center btn-pink"
							type="submit"
							disabled={isSubmitting}
						>
							{t('general.save')}
						</Button>
					</div>
				</Form>
			</FormProvider>
		);
	}

	return (
		<View suspend={isPending} topBarProps={topBarProps}>
			<FormProvider {...methods}>
				<VerifyModal
					showVerifyModal={showVerifyModal}
					setShowVerifyModal={setShowVerifyModal}
					selectedEvent={selectedEvent}
					isSubmitting={isSubmitting}
					handleVerifiedSubmit={handleVerifiedSubmit}
				/>
				<div className="flex-fill h-100">
					<Form
						onSubmit={handleSubmit(onSubmit)}
						className="pb-3 flex-fill d-flex flex-column"
					>
						{currentPhase === 1 && (
							<>
								<EventForm
									onEventSelect={onEventSelect}
									eventsForSelect={eventsForSelect}
									selectedEvent={selectedEvent}
									eventTypes={eventTypes}
								/>
								<div className="d-flex w-100 justify-content-end">
									<Button
										className="btn-pink mt-2"
										disabled={!readyForNextPhase}
										onClick={() => setCurrentPhase(2)}
									>
										{t('general.next')}
									</Button>
								</div>
							</>
						)}
						{currentPhase === 2 && (
							<>
								<TicketForm
									selectedEvent={selectedEvent}
									customFilter={customFilter}
								/>

								<div className="d-flex justify-content-between gap-2 mt-2">
									<Button
										className="btn-secondary"
										onClick={() => setCurrentPhase(1)}
										style={{
											whiteSpace: 'nowrap',
										}}
									>
										{t('general.back')}
									</Button>
									<Button
										className="w-100 d-flex justify-content-center align-items-center btn-pink"
										type="submit"
										disabled={isSubmitting}
										style={{
											whiteSpace: 'nowrap',
										}}
									>
										{t('listing.createListing')}
									</Button>
								</div>
							</>
						)}
					</Form>
				</div>
			</FormProvider>
		</View>
	);
};

export default ListingForm;
