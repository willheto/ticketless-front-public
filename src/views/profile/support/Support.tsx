import React from 'react';
import { BiSupport, BiBriefcase } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';

const Support = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<View topBarProps={{ header: t('general.contactUs') }}>
			<div className="h-100 d-flex flex-column">
				<div>
					<BiSupport size={55} className="mb-2" />
					<h3>{t('profile.customerSupport')}</h3>
					<p>{t('profile.contactUsDescription')}</p>
					<a href="mailto:support@ticketless.fi">
						support@ticketless.fi
					</a>
				</div>
				<hr />
				<div>
					<BiBriefcase size={55} className="mb-2" />
					<h3>{t('profile.companiesAndStudentAssociations')}</h3>
					<p>
						{t(
							'profile.companiesAndStudentAssociationsDescription',
						)}
					</p>
					<a href="mailto:info@ticketless.fi">info@ticketless.fi</a>
				</div>
			</div>
		</View>
	);
};

export default Support;
