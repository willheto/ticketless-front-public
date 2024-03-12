import { PrivacyPolicyContent } from '@src/views/profile/termsAndPolicies/PrivacyPolicy';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { BiCookie } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const CookieConsent = (): JSX.Element | null => {
	const [showConsent, setShowConsent] = useState<boolean>(true);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
	const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
	const { t } = useTranslation();

	const handleSubmit = async (payload: {
		analytics: boolean;
		necessary: boolean;
	}): Promise<void> => {
		try {
			const cookieConsent = {
				...payload,
				expires: new Date(
					new Date().setFullYear(new Date().getFullYear() + 1),
				),
			};

			// Set CookieConsent cookie to frontend
			document.cookie = `CookieConsent=${JSON.stringify(
				cookieConsent,
			)}; expires=${cookieConsent.expires}; path=/`;

			setShowConsent(false);
		} catch (error) {
			console.log(error);
		}
	};

	const showCookieConsent = (): boolean => {
		// Check if cookie consent has been set
		if (document.cookie) {
			const cookieConsent = document.cookie
				?.split('; ')
				?.find(row => row.startsWith('CookieConsent'))
				?.split('=')[1];

			if (cookieConsent) {
				return false;
			}
		}

		return true;
	};

	return (
		(showCookieConsent() && (
			<>
				<Modal
					show={showPrivacyPolicy}
					onHide={() => setShowPrivacyPolicy(false)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Tietosuojaseloste</Modal.Title>
					</Modal.Header>
					<PrivacyPolicyContent />
				</Modal>
				<Modal
					show={showConsent}
					centered
					className="d-flex flex-column"
					backdrop="static"
				>
					<div className="p-4 d-flex flex-column text-center">
						<div className="align-self-center pb-4">
							<BiCookie size={55} />
						</div>
						<div className="mt-2">
							<h3>{t('general.thisAppUsesCookies')}</h3>
							{t('general.cookieConsentDescription')}{' '}
							<Form.Label
								className="mb-2"
								style={{
									color: '#f24594',
									textDecoration: 'underline',
								}}
								onClick={() => setShowPrivacyPolicy(true)}
							>
								{t('general.inPrivacyPolicy')}
							</Form.Label>
						</div>
						<div className="mt-4 d-flex justify-content-around">
							<Form.Group className="d-flex flex-column gap-2">
								<Form.Label>
									{t('general.necessaryCookies')}
								</Form.Label>
								<Form.Switch
									// Automatically checked and disabled
									checked
									disabled
									style={{ transform: 'scale(2)' }}
								/>
							</Form.Group>
							<Form.Group className="d-flex flex-column gap-2">
								<Form.Label>
									{t('general.analytics')}
								</Form.Label>
								<Form.Switch
									onChange={e =>
										setAnalyticsConsent(e.target.checked)
									}
									style={{ transform: 'scale(2)' }}
								/>
							</Form.Group>
						</div>
						<div className="d-flex flex-column mt-4 justify-content-center gap-2 align-items-center">
							<Button
								className="btn-pink w-100 justify-content-center"
								onClick={() => {
									const payload = {
										analytics: true,
										necessary: true,
									};
									handleSubmit(payload);
								}}
							>
								{t('general.acceptAll')}
							</Button>
							<Button
								className="btn-pink w-100 justify-content-center"
								style={{
									backgroundColor: 'white',
									color: '#f24594',
								}}
								onClick={() => {
									const payload = {
										analytics: analyticsConsent,
										necessary: true,
									};
									handleSubmit(payload);
								}}
							>
								{t('general.acceptChosenCookies')}
							</Button>
							<Button
								className="btn-pink w-100 justify-content-center"
								style={{
									backgroundColor: 'white',
									color: '#f24594',
								}}
								onClick={() => {
									const payload = {
										analytics: false,
										necessary: true,
									};
									handleSubmit(payload);
								}}
							>
								{t('general.cancelCookies')}
							</Button>
						</div>
					</div>
				</Modal>
			</>
		)) ||
		null
	);
};

export default CookieConsent;
