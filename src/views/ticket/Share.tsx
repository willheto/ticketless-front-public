import React from 'react';
import { Form } from 'react-bootstrap';
import { IoCopyOutline } from 'react-icons/io5';
import { BsShare } from 'react-icons/bs';
import whatsApp_logo from '@src/assets/whatsApp_logo.svg';
import telegram_logo from '@src/assets/telegram_logo.svg';
import { TelegramShareButton, WhatsappShareButton } from 'react-share';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Share = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<div className="p-4 d-flex flex-column position-relative">
			<div className="align-self-center pb-4">
				<BsShare size={55} />
			</div>
			<Form.Group className="text-center">
				<h3>{t('listing.shareListing')}</h3>
				{t('listing.shareListingDescription')}
			</Form.Group>

			<div className="d-flex justify-content-center gap-4 mt-4">
				<WhatsappShareButton
					className="d-flex flex-column align-items-center"
					url={window.location.href}
					title="Lippu tapahtumaan"
				>
					<img src={whatsApp_logo} alt="whatsapp" width="25" />
					WhatsApp
				</WhatsappShareButton>

				<TelegramShareButton
					className="d-flex flex-column align-items-center"
					url={window.location.href}
					title="Lippu tapahtumaan"
				>
					<img src={telegram_logo} alt="telegram" width="25" />
					Telegram
				</TelegramShareButton>

				<div className="d-flex flex-column align-items-center">
					<IoCopyOutline
						size={25}
						color="#f24594"
						onClick={() => {
							toast(t('listing.linkCopiedToClipboard'));
							navigator.clipboard.writeText(window.location.href);
						}}
					/>
					{t('listing.copyLink')}
				</div>
			</div>
		</div>
	);
};

export default Share;
