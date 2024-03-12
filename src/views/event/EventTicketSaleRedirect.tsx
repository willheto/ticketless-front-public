import React from 'react';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';

const EventTicketSaleRedirect = ({
	event,
}: {
	event: EventInterface;
}): JSX.Element => {
	const { t } = useTranslation();

	const eventHasCustomRedirectText =
		event?.redirectCustomText && event?.redirectCustomText.length > 0;
	const eventHasCustomButtonText =
		event?.redirectCustomButtonText &&
		event?.redirectCustomButtonText.length > 0;

	return (
		<View
			topBarProps={{
				header: event ? event.name : t('general.tickets'),
			}}
		>
			<div
				className="d-flex flex-column align-items-center justify-content-center gap-3"
				style={{ wordBreak: 'break-word' }}
			>
				{event?.image && (
					<div>
						<img
							src={event.image}
							className="rounded"
							style={{
								objectFit: 'cover',
								width: '100%',
								height: '100%',
								minWidth: '100%',
								minHeight: '100%',
							}}
						/>
					</div>
				)}
				<div className="text-center">
					{eventHasCustomRedirectText ? (
						<p>{event.redirectCustomText}</p>
					) : (
						<p> {t('events.ticket_sale_redirect_active')}</p>
					)}
				</div>
				<a href={event.ticketSaleUrl} className="btn btn-pink">
					{eventHasCustomButtonText
						? event.redirectCustomButtonText
						: t('events.ticket_sale')}
				</a>
			</div>
		</View>
	);
};

export default EventTicketSaleRedirect;
