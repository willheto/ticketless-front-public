import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import fi from 'date-fns/locale/fi';
import { towns } from '@src/assets/FinnishTowns';
import { Form } from 'react-bootstrap';
import { utcStringToLocalDate, toUtc } from '@src/utils/dateUtils';

type EventFormTypes = {
	onEventSelect: ({
		value,
		label,
		__isNew__,
	}: {
		value: string;
		label: string;
		__isNew__?: boolean;
	}) => void;
	eventsForSelect: { label: string; value: string }[];
	selectedEvent?: EventInterface;
	eventTypes: string[];
};

const EventForm = ({
	onEventSelect,
	eventsForSelect,
	selectedEvent,
	eventTypes,
}: EventFormTypes): JSX.Element => {
	const { t } = useTranslation();

	const {
		register,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useFormContext();

	const dateWatch = watch('date');

	return (
		<div className="d-flex flex-column gap-2">
			<h3>{t('listing.firstFillEventInfo')}</h3>
			<Form.Group className="mb-2 mt-2 required">
				<Form.Label>{t('listing.event')}</Form.Label>
				<Creatable
					formatCreateLabel={inputValue =>
						`${t('listing.createEvent')} ${inputValue}`
					}
					{...register('newEventName', {
						required: t('listing.eventNameRequired'),
					})}
					value={
						selectedEvent
							? {
									label: selectedEvent.name,
									value: selectedEvent.name,
								}
							: watch('newEventName')
								? {
										label: watch('newEventName'),
										value: watch('newEventName'),
									}
								: null
					}
					onChange={(e: {
						value: string;
						label: string;
						__isNew__?: boolean;
					}) => {
						if (e !== null) {
							onEventSelect(e);
							setValue('newEventName', e.value.toString());
						}
					}}
					options={eventsForSelect}
					placeholder={t('listing.event')}
				/>
				<span style={{ fontSize: '12px' }}>
					{t('listing.eventSelectorDescription')}
				</span>
				<ErrorMessage
					errors={errors}
					name="newEventName"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="mb-2 required">
				<Form.Label>{t('listing.eventLocation')}</Form.Label>

				<Select
					{...register('location', {
						required: t('listing.locationRequired'),
					})}
					onChange={(e: { value: string; label: string }) => {
						if (e !== null) {
							setValue('location', e.value.toString());
							clearErrors('location');
						} else {
							setValue('location', '');
						}
					}}
					options={towns.map((town: string) => ({
						label: town,
						value: town,
					}))}
					value={
						watch('location') !== ''
							? {
									label: watch('location'),
									value: watch('location'),
								}
							: null
					}
					isDisabled={selectedEvent ? true : false}
					placeholder={t('listing.location')}
				/>

				<ErrorMessage
					errors={errors}
					name="location"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="mb-2 required">
				<Form.Label>{t('events.eventType')}</Form.Label>
				<Select
					{...register('type', {
						required: t('listing.typeRequired'),
					})}
					onChange={(e: { value: string; label: string }) => {
						if (e !== null) {
							setValue('type', e.value.toString());
							clearErrors('type');
						} else {
							setValue('type', '');
						}
					}}
					options={eventTypes.map((type: string) => ({
						label: t(`eventTypes.${type}`) || type,
						value: type,
					}))}
					value={
						watch('type') !== ''
							? {
									label: t(
										'eventTypes.' + watch('type') ||
											watch('type'),
									),
									value: watch('type'),
								}
							: null
					}
					isDisabled={selectedEvent ? true : false}
					placeholder={t('events.eventType')}
				/>

				<ErrorMessage
					errors={errors}
					name="type"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="d-flex flex-column mb-2 required">
				<Form.Label>{t('listing.eventStartTime')}</Form.Label>
				<DatePicker
					required
					{...register('date', {
						required: true,
					})}
					disabled={selectedEvent ? true : false}
					calendarStartDay={1}
					locale={fi}
					className="form-control"
					dateFormat="dd.MM.yyyy"
					selected={
						dateWatch ? utcStringToLocalDate(dateWatch) : null
					}
					placeholderText={t('listing.startTimePlaceholder')}
					onChange={(date: Date): void => {
						setValue('date', toUtc(date), {
							shouldDirty: true,
						});
					}}
				/>
				<ErrorMessage
					errors={errors}
					name="date"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
		</div>
	);
};

export default EventForm;
