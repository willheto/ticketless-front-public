import React, { ReactNode, useRef } from 'react';
import { IoLocation } from 'react-icons/io5';
import { IoChevronDown } from 'react-icons/io5';
import styled, { CSSObject } from 'styled-components';
import {
	IoCompassOutline,
	IoHomeOutline,
	IoHomeSharp,
	IoCompass,
} from 'react-icons/io5';
import { BsPinMap, BsPinMapFill } from 'react-icons/bs';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Form, Offcanvas } from 'react-bootstrap';
import { towns } from '../../assets/FinnishTowns';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/context/UserContext';

type AccordionProps = {
	location: string | ReactNode;
	setLocation: (location: string) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	events: EventInterface[];
};

const StyledContainer = styled.div`
	pointer-events: auto !important;
	margin-top: 8px;
	margin-bottom: 12px;
`;

const StyledContent = styled.div`
	.item {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
		min-height: 38px;
		color: hsl(0, 0%, 50%);
		font-size: 1.1rem;
	}
`;

const selectStyles = {
	control: (provided): CSSObject => ({
		...provided,
		border: 'none',
		boxShadow: 'none',
		padding: 0,
		fontSize: '1.1rem',
		color: '#000',
		zIndex: 9999,
	}),
	menuPortal: (base): CSSObject => ({
		...base,
		zIndex: 9999,
		minWidth: '200px',
	}),
	valueContainer: (base): CSSObject => ({
		...base,
		padding: 0,
		paddingRight: '8px',
		margin: 0,
	}),
	container: (base): CSSObject => ({
		...base,
	}),
	singleValue: (base): CSSObject => ({
		...base,
		color: '#000',
		fontWeight: 600,
		margin: 0,
	}),
	input: (base): CSSObject => ({
		...base,
		margin: 0,
	}),
	placeholder: (base): CSSObject => ({
		...base,
		margin: 0,
	}),
};

const LocationAccordion: React.FC<AccordionProps> = ({
	location,
	setLocation,
	isOpen,
	setIsOpen,
	events,
}): JSX.Element | null => {
	const { user } = useUser();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const accordionRef = useRef<HTMLDivElement>(null);

	const allLocationsWithEvents = towns
		.sort()
		.filter(town => events?.some(event => event.location === town))
		.map(location => {
			return {
				label: location,
				value: location,
			};
		});

	const changeLocation = (location: string): void => {
		setLocation(location);
		sessionStorage.setItem('location', location);
		// setIsOpen(false);
	};

	const formatGroupLabel = (data: {
		label: string;
		options: { label: string; value: string }[];
	}): ReactNode => (
		<div>
			<Form.Label style={{ color: 'black', fontSize: '14px' }}>
				{data.label}
			</Form.Label>
		</div>
	);

	return (
		<StyledContainer ref={accordionRef}>
			<div
				className="d-flex align-items-center justify-content-center gap-2"
				style={{ cursor: 'pointer' }}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<span style={{ marginTop: '-2px' }}>
					<IoLocation size={18} style={{ color: '#f24594' }} />
				</span>
				<span
					style={{
						fontSize: '1.1rem',
						fontWeight: '500',
					}}
				>
					{location ? location : t('events.everywhere')}
				</span>
				<span>
					<IoChevronDown
						style={{
							color: '#000',
							transform: isOpen
								? 'rotate(180deg)'
								: 'rotate(0deg)',
						}}
						size={18}
					/>
				</span>
			</div>
			<Offcanvas
				show={isOpen}
				onHide={() => setIsOpen(false)}
				placement="top"
				style={{
					maxWidth: '700px',
					margin: '0 auto',
					height: 'fit-content',
					borderRadius: '0 0 5px 5px',
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						{t('general.selectLocation')}
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body style={{ paddingTop: 0 }}>
					<StyledContent>
						<div className="d-flex flex-column gap-2">
							<div
								className="item"
								onClick={() => changeLocation('')}
							>
								<span className="d-flex align-items-center">
									{location === '' ? (
										<IoCompass color="f24594" size={20} />
									) : (
										<IoCompassOutline size={20} />
									)}
								</span>
								<span
									style={
										location === ''
											? { color: '#000', fontWeight: 600 }
											: {}
									}
								>
									{t('events.everywhere')}
								</span>
							</div>
							{user?.city ? (
								<div
									onClick={() => {
										changeLocation(user.city);
									}}
									className="item"
								>
									<span className="d-flex align-items-center">
										{location === user.city ? (
											<IoHomeSharp
												color="f24594"
												size={20}
											/>
										) : (
											<IoHomeOutline size={20} />
										)}
									</span>
									<span
										style={
											location === user?.city
												? {
														color: '#000',
														fontWeight: 600,
													}
												: {}
										}
									>
										{user.city}
									</span>
								</div>
							) : user ? (
								<div className="item">
									<span className="d-flex align-items-center">
										<IoHomeSharp color="f24594" size={20} />
									</span>
									<span
										onClick={() =>
											navigate('/profile/details')
										}
										style={{ textDecoration: 'underline' }}
									>
										{t('profile.set_home_city')}
									</span>
								</div>
							) : null}

							<div className="item">
								<span className="d-flex align-items-center">
									{location !== '' &&
									location !== user?.city ? (
										<BsPinMapFill
											color="f24594"
											size={20}
										/>
									) : (
										<BsPinMap size={20} />
									)}
								</span>
								<Select
									options={allLocationsWithEvents}
									formatGroupLabel={formatGroupLabel}
									onChange={e => {
										if (e?.value) {
											changeLocation(e.value.toString());
										} else {
											setLocation('');
										}
									}}
									value={
										location !== '' &&
										location !== user?.city
											? {
													label: location,
													value: location,
												}
											: null
									}
									placeholder={t('events.city')}
									isClearable={true}
									// @ts-expect-error TODO
									styles={selectStyles}
									menuPortalTarget={document.body}
								/>
							</div>
						</div>
					</StyledContent>
				</Offcanvas.Body>
			</Offcanvas>
		</StyledContainer>
	);
};

export default LocationAccordion;
