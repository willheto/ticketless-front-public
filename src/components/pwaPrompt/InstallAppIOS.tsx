import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IoShareOutline } from 'react-icons/io5';
import { Form } from 'react-bootstrap';

const InstallAppIOS = ({
	setInstallPromptActive,
}: {
	setInstallPromptActive: (active: boolean) => void;
}): JSX.Element | null => {
	const [isIOS, setIsIOS] = useState<boolean>(false);
	const [isPWAInstalled, setIsPWAInstalled] = useState<boolean>(false);
	const { t } = useTranslation();

	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		setIsIOS(
			/iphone|ipad|ipod/.test(userAgent) &&
				// @ts-expect-error window.msStream is valid
				!window.MSStream &&
				!!navigator.platform &&
				/iPad|iPhone|iPod/.test(navigator.platform),
		);
		if ('standalone' in window.navigator && window.navigator.standalone) {
			setIsPWAInstalled(true);
		} else {
			setInstallPromptActive(true);
		}
	}, [setInstallPromptActive]);

	return isIOS && !isPWAInstalled ? (
		<Modal
			centered
			show={true}
			onHide={() => {
				setIsPWAInstalled(true);
				setInstallPromptActive(false);
			}}
		>
			<div className="p-4 d-flex flex-column text-center">
				<h3>{t('install.install_ticketless')}</h3>
				<p>{t('install.install_ticketless_description')}</p>
				<div className="d-flex align-items-center justify-content-center">
					<Form.Label>{t('install.press')}</Form.Label>
					<IoShareOutline size={35} className="mx-2" />
				</div>
				<div className="mt-1 d-flex align-items-center justify-content-center">
					<Form.Label>{t('install.and_choose')}</Form.Label>
				</div>
				<Button
					onClick={() => {
						setIsPWAInstalled(true);
						setInstallPromptActive(false);
					}}
					className="btn-pink mt-4 align-self-center"
					style={{ width: '100px' }}
				>
					{t('install.close')}
				</Button>
			</div>
		</Modal>
	) : null;
};

export default InstallAppIOS;
