import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type VerifyModalProps = {
	showVerifyModal: boolean;
	setShowVerifyModal: (show: boolean) => void;
	selectedEvent?: EventInterface;
	handleVerifiedSubmit: () => void;
	isSubmitting: boolean;
};

const VerifyModal = ({
	showVerifyModal,
	setShowVerifyModal,
	selectedEvent,
	handleVerifiedSubmit,
	isSubmitting,
}: VerifyModalProps): JSX.Element => {
	const { t } = useTranslation();

	const { watch } = useFormContext();
	const sellingWatch = watch('selling');

	const getEventTypeTranslation = (type: string): string => {
		return t('eventTypes.' + type);
	};

	return (
		<Modal
			centered
			onHide={() => setShowVerifyModal(false)}
			show={showVerifyModal}
		>
			<div className="p-4 d-flex flex-column overflow-auto">
				<h3 className="text-center mb-2">
					{t('listing.checkListingInfo')}
				</h3>
				<Form.Label>{t('listing.event')}:</Form.Label>
				{selectedEvent?.name || watch('newEventName')}
				<Form.Label className="mt-2">
					{t('listing.eventLocation')}:
				</Form.Label>
				{watch('location')}
				<Form.Label className="mt-2">
					{t('events.eventType')}:
				</Form.Label>
				{getEventTypeTranslation(selectedEvent?.type || watch('type'))}
				<Form.Label className="mt-2">
					{t('listing.eventStartTime')}:
				</Form.Label>
				{new Date(watch('date')).toLocaleDateString()}
				<hr />
				{sellingWatch && (
					<>
						<Form.Label className="mt-2">
							{t('listing.ticketPrice')}:
						</Form.Label>
						{watch('price')} €
					</>
				)}

				<Form.Label className="mt-2">
					{t('listing.ticketQuantity')}:
				</Form.Label>
				{watch('quantity')}
				<Form.Label className="mt-2">
					{t('listing.listingLabel')}:
				</Form.Label>
				<span style={{ wordBreak: 'break-word' }}>
					{watch('header')}
				</span>
				{watch('description') !== '' && (
					<>
						<Form.Label className="mt-2">
							{t('listing.listingDetails')}:
						</Form.Label>
						<span style={{ wordBreak: 'break-word' }}>
							{watch('description')}
						</span>
					</>
				)}
				{sellingWatch && (
					<>
						<Form.Label className="mt-2">
							{t('listing.requiresStudentAssociationMembership')}
						</Form.Label>
						{watch('requiresMembership')
							? t('general.yes')
							: t('general.no')}
						{watch('requiresMembership') === true && (
							<>
								<Form.Label className="mt-2">
									{t('listing.studentAssociation')}
								</Form.Label>

								{watch('association')}
							</>
						)}
					</>
				)}

				<Form.Group className="mt-2 gap-2 d-flex">
					<Button
						className="btn-secondary w-50"
						onClick={() => setShowVerifyModal(false)}
					>
						{t('general.back')}
					</Button>
					<Button
						className="btn-pink w-50"
						onClick={() => handleVerifiedSubmit()}
						disabled={isSubmitting}
					>
						{t('listing.createListing')}
					</Button>
				</Form.Group>
			</div>
		</Modal>
	);
};

export default VerifyModal;
