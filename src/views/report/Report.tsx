import api from '@src/api';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type PropTypes = {
	setModalShow: (modalShow: boolean) => void;
	setIsReporting: (isReporting: boolean) => void;
	reporterID: number;
	reportedID: number;
};

const Report = (props: PropTypes): JSX.Element => {
	const { t } = useTranslation();
	const { setModalShow, setIsReporting, reportedID, reporterID } = props;

	const [reportReason, setReportReason] = useState<string>('');

	const handleReport = async (reportReason: string): Promise<void> => {
		try {
			if (!reportedID || !reporterID) return;

			const payload = {
				reportedID: reportedID,
				reporterID: reporterID,
				description: reportReason,
			};
			await api.reports.reportUser(payload);
			toast(t('listing.reportSent'));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex flex-column gap-2">
			<Form.Label>{t('listing.reportReason')}</Form.Label>
			<Form.Control
				as="textarea"
				rows={3}
				placeholder={t('listing.reportPlaceholder')}
				onChange={e => setReportReason(e.target.value)}
			/>
			<Button
				className={
					'd-flex align-items-center justify-content-center w-100 btn-pink'
				}
				style={{ maxWidth: '100%' }}
				onClick={() => {
					handleReport(reportReason);
					setIsReporting(false);
					setModalShow(false);
				}}
			>
				<Form.Label>{t('general.report')}</Form.Label>
			</Button>

			<Button
				className={
					'd-flex align-items-center justify-content-center w-100 btn-secondary'
				}
				onClick={() => {
					setIsReporting(false);
					setModalShow(false);
				}}
			>
				<Form.Label>{t('general.cancel')}</Form.Label>
			</Button>
		</div>
	);
};

export default Report;
