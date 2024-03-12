import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

let deferredPrompt: Event | null;

const InstallApp = ({
	setInstallPromptActive,
}: {
	setInstallPromptActive: (active: boolean) => void;
}): JSX.Element => {
	const [showInstall, setShowInstall] = useState<boolean>(false);
	const [showInstallButton, setShowInstallButton] = useState<boolean>(false);

	const { t } = useTranslation();

	window.addEventListener('beforeinstallprompt', e => {
		e.preventDefault();
		deferredPrompt = e;
		setShowInstallButton(true);
		setShowInstall(true);
		setInstallPromptActive(true);
	});

	const handleInstall = async (): Promise<void> => {
		if (deferredPrompt) {
			// @ts-expect-error TODO
			deferredPrompt.prompt();
			// @ts-expect-error TODO
			await deferredPrompt.userChoice;

			deferredPrompt = null;
		}
		setInstallPromptActive(false);
	};

	return (
		<Modal
			centered
			show={showInstall}
			onHide={() => {
				setShowInstall(false);
				setInstallPromptActive(false);
			}}
		>
			<div className="p-4 d-flex flex-column text-center">
				<h3>{t('install.install_ticketless')}</h3>
				<p>{t('install.install_ticketless_description')}</p>
				{showInstallButton && (
					<Button
						className="btn-pink align-self-center"
						onClick={() => handleInstall()}
						style={{ width: '100px' }}
					>
						{t('install.install')}
					</Button>
				)}
			</div>
		</Modal>
	);
};

export default InstallApp;
