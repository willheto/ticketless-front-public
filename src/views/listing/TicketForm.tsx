import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import SellingForm from './SellingForm';
import BuyingForm from './BuyingForm';

const TicketForm = ({
	selectedEvent,
	customFilter,
}: {
	selectedEvent?: EventInterface;
	customFilter: (
		option: { label: string; value: string },
		inputValue: string,
	) => boolean;
}): JSX.Element => {
	const { t } = useTranslation();
	const { setValue, watch } = useFormContext();

	return (
		<div className="d-flex flex-column gap-2">
			<h3 className="mb-2">{t('listing.ticketInformation')}</h3>
			<Form.Group className="required">
				<Form.Check
					id="isSellingRadio"
					inline
					label={
						<label htmlFor="isSellingRadio">
							{t('listing.selling')}
						</label>
					}
					type="radio"
					checked={watch('isSelling') === true}
					onClick={() => {
						setValue('isSelling', true, {
							shouldDirty: true,
						});

						setValue('association', '', {
							shouldDirty: true,
						});
						setValue('requiresMembership', false, {
							shouldDirty: true,
						});
					}}
				/>
				<Form.Check
					id="isBuyingRadio"
					inline
					label={
						<label htmlFor="isBuyingRadio">
							{t('listing.buying')}
						</label>
					}
					type="radio"
					checked={watch('isSelling') === false}
					onClick={() => {
						setValue('isSelling', false, {
							shouldDirty: true,
						});

						setValue('requiresMembership', false, {
							shouldDirty: true,
						});
						setValue('association', '', {
							shouldDirty: true,
						});
					}}
				/>
			</Form.Group>

			{watch('isSelling') ? (
				<SellingForm
					selectedEvent={selectedEvent}
					customFilter={customFilter}
				/>
			) : (
				<BuyingForm />
			)}
		</div>
	);
};

export default TicketForm;
