import React from 'react';
import { eventTypes } from '@src/assets/EventTypes';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

type PropTypes = {
	showFilterModal: boolean;
	setShowFilterModal: (show: boolean) => void;
	eventTypeFilter: string;
	setEventTypeFilter: (eventType: string) => void;
};

const FilterModal = (props: PropTypes): JSX.Element => {
	const {
		showFilterModal,
		setShowFilterModal,
		eventTypeFilter,
		setEventTypeFilter,
	} = props;

	const { t } = useTranslation();
	/**
	 * Styles for the select component
	 */
	const selectStyles = {
		control: provided => ({
			...provided,
			borderRadius: '50px',
			marginLeft: '5px',
			marginRight: '5px',
			border: 'none',
			boxShadow: 'none',
			'&:hover': {
				border: '1px solid #E5E5E5',
			},

			'&:focus': {
				border: '1px solid #E5E5E5',
			},
			zIndex: 9999,
		}),
		menuPortal: base => ({
			...base,
			zIndex: 9999,
		}),
	};

	return (
		<Modal
			show={showFilterModal}
			onHide={() => setShowFilterModal(false)}
			centered
		>
			<div className="p-4 overflow-auto d-flex flex-column">
				<Form.Group className="text-center">
					<h3>{t('events.filters')} </h3>
				</Form.Group>
				<div className="gap-2 d-flex flex-column">
					<Select
						className="shadow-sm border rounded-pill"
						options={eventTypes.sort().map((eventType: string) => ({
							label: t('eventTypes.' + eventType || eventType),
							value: eventType,
						}))}
						onChange={e => {
							if (e !== null) {
								setEventTypeFilter(e.value);
							} else {
								setEventTypeFilter('');
							}
						}}
						value={
							eventTypeFilter !== ''
								? {
										label: t(
											'eventTypes.' + eventTypeFilter ||
												eventTypeFilter,
										),

										value: eventTypeFilter,
									}
								: null
						}
						placeholder={t('events.eventType')}
						isClearable={true}
						styles={selectStyles}
						menuPortalTarget={document.body}
					/>
				</div>
				<div className="d-flex justify-content-between align-items-center mt-4">
					<div
						onClick={() => {
							setEventTypeFilter('');
						}}
					>
						<u>{t('events.removeFilters')}</u>
					</div>
					<Button
						className="w-50 shadow-sm text-center h-auto btn-pink"
						onClick={() => setShowFilterModal(false)}
					>
						{t('general.use')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default FilterModal;
