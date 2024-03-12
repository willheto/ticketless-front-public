import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

const BuyingForm = (): JSX.Element => {
	const { t } = useTranslation();

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<Form.Group className="mb-2 required">
				<Form.Label>{t('listing.ticketQuantity')}</Form.Label>
				<Form.Control
					type="number"
					min="1"
					max="5"
					{...register('quantity', {
						min: {
							value: 1,
							message: t('listing.QuantityMustBeOverZero'),
						},
						required: t('listing.ticketQuantityRequired'),
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="quantity"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="mb-2 required">
				<Form.Label>{t('listing.listingLabel')}</Form.Label>
				<Form.Control
					maxLength={50}
					{...register('header', {
						required: t('listing.labelRequired'),
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="header"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="mb-2">
				<Form.Label>{t('listing.listingDetails')}</Form.Label>
				<Form.Control
					as="textarea"
					maxLength={200}
					rows={5}
					{...register('description', {
						required: false,
					})}
				/>
			</Form.Group>
		</>
	);
};

export default BuyingForm;
