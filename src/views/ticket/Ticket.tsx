import React from 'react';
import { Form } from 'react-bootstrap';
import { IoCash, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineExclamation } from 'react-icons/ai';

const Ticket = ({ ticket }: { ticket: TicketInterface }): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const buyingStyle = {
		backgroundColor: '#D3D3D3',
		color: 'black',
		fontWeight: '400',
		borderRadius: '4px',
	};
	const sellingStyle = {
		backgroundColor: '#f24594',
		color: 'white',
		fontWeight: '350',
		borderRadius: '4px',
	};

	return (
		<div
			onClick={() => navigate(`/tickets/${ticket.ticketID}`)}
			className="border shadow-sm rounded p-2 d-flex flex-column gap-3"
			style={{
				backgroundColor: 'white',
				cursor: 'pointer',
			}}
		>
			<div className="d-flex justify-content-between">
				<label
					className="px-2"
					style={ticket.isSelling ? sellingStyle : buyingStyle}
				>
					{ticket.isSelling
						? t('general.selling')
						: t('general.buying')}
				</label>
				{ticket.isSelling && (
					<div className="d-flex align-items-center jsutify-content-center gap-1">
						<IoCash size={20} color="#f24594" />
						<Form.Label>
							{ticket.price} {t('general.ticketPriceSuffixLabel')}
						</Form.Label>
					</div>
				)}
				<div className="d-flex align-items-center justify-content-center gap-1">
					<IoTicket size={20} color="#f24594" />
					<Form.Label>
						{ticket.quantity}
						{t('general.ticketQuantitySuffixLabel')}
					</Form.Label>
				</div>
			</div>

			<div>
				<Form.Label
					style={{
						wordBreak: 'break-word',
					}}
				>
					{ticket.header}
				</Form.Label>
				<div style={{ wordBreak: 'break-word' }}>
					{ticket.description}
				</div>
				{ticket.association && (
					<Form.Group
						className="d-flex flex-row align-items-center"
						style={{
							marginLeft: '-8px',
							marginBottom: '3px',
							marginTop: '5px',
						}}
					>
						<AiOutlineExclamation
							size={20}
							style={{
								color: '#f24594',
							}}
						/>{' '}
						<div>
							Vaatii ainejärjestöjäsenyyden {ticket.association}
						</div>
					</Form.Group>
				)}
			</div>
		</div>
	);
};

export default Ticket;
