import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import associations from '@src/assets/associations.json';
import { useFormContext } from 'react-hook-form';

type SellingFormTypes = {
	selectedEvent?: EventInterface;
	customFilter: (
		option: { label: string; value: string },
		inputValue: string,
	) => boolean;
};

const SellingForm = ({
	selectedEvent,
	customFilter,
}: SellingFormTypes): JSX.Element => {
	const { t } = useTranslation();

	const {
		register,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext();
	const sellingWatch = watch('selling');
	const associationWatch = watch('association');

	return (
		<>
			<Form.Group className="mb-2 required">
				<Form.Label>{t('listing.ticketPrice')}</Form.Label>
				<Form.Control
					type="number"
					min="0"
					max={selectedEvent?.ticketMaxPrice || 1000}
					{...register('price', {
						required: t('listing.pricePerTicketRequired'),
					})}
				/>
				{selectedEvent?.ticketMaxPrice && (
					<span style={{ color: '#f24594' }}>
						{t('listing.ticket_max_price_info', {
							price: selectedEvent?.ticketMaxPrice,
						})}
					</span>
				)}
				<ErrorMessage
					errors={errors}
					name="price"
					render={({ message }) => (
						<p className="text-danger mb-0">{message}</p>
					)}
				/>
			</Form.Group>
			<Form.Group className="mb-2 required">
				<Form.Label>
					{sellingWatch
						? t('listing.ticketQuantity')
						: t('listing.ticketQuantity')}
				</Form.Label>
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
					rows={5}
					maxLength={200}
					{...register('description', {
						required: false,
					})}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<label className="w-100" htmlFor="requiresMembership">
					<Form.Check
						label={t(
							'listing.requiresStudentAssociationMembership',
						)}
						id="requiresMembership"
						{...register('requiresMembership', {
							required: false,
						})}
					/>
				</label>
				{watch('requiresMembership') && (
					<>
						<Form.Label className="required">
							{t('listing.studentAssociation')}
						</Form.Label>
						<Select
							{...register('association', {
								required: t('listing.associationRequired'),
							})}
							filterOption={customFilter}
							menuPlacement="top"
							onChange={(e: { label: string; value: string }) => {
								if (e !== null && e.value !== undefined) {
									setValue('association', e.value.toString());
								} else {
									setValue('association', '');
								}
							}}
							options={[
								...associations.map((type: string) => ({
									label: type,
									value: type,
								})),
								{
									label: 'Muu järjestö / ei löydy listasta',
									value: 'other',
								},
							]}
							value={
								watch('association') !== ''
									? {
											label:
												watch('association') === 'other'
													? 'Muu järjestö / ei löydy listasta'
													: watch('association'),

											value: watch('association'),
										}
									: null
							}
							placeholder={t('listing.studentAssociation')}
						/>
						<ErrorMessage
							errors={errors}
							name="association"
							render={({ message }) => (
								<p className="text-danger mb-0">{message}</p>
							)}
						/>
					</>
				)}
				{associationWatch === 'other' && (
					<label className="mt-1">
						{t('listing.pleaseStateAssociation')}
					</label>
				)}
			</Form.Group>
		</>
	);
};

export default SellingForm;
