import React from 'react';
import {
	IoBookOutline,
	IoChevronForwardSharp,
	IoLockClosedOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import View from '@src/components/layout/View';
import styled from 'styled-components';

const StyledTermsAndPolicies = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	> div {
		cursor: pointer;
	}
`;

const TermsAndPolicies = (): JSX.Element => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<View topBarProps={{ header: t('profile.termsAndPrivacy') }}>
			<StyledTermsAndPolicies>
				<div
					className="d-flex justify-content-between align-items-center border-bottom py-2"
					onClick={() => navigate('terms')}
				>
					<div>
						<IoBookOutline size={25} className="me-3" />
						{t('profile.terms')}
					</div>
					<IoChevronForwardSharp size={'20'} />
				</div>
				<div
					className="d-flex justify-content-between align-items-center border-bottom py-2"
					onClick={() => navigate('privacy-policy')}
				>
					<div>
						<IoLockClosedOutline size={25} className="me-3" />
						{t('profile.privacyPolicy')}
					</div>
					<IoChevronForwardSharp size={'20'} />
				</div>
			</StyledTermsAndPolicies>
		</View>
	);
};

export default TermsAndPolicies;
