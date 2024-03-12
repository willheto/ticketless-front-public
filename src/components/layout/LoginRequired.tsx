import React from 'react';
import { Button } from 'react-bootstrap';
import logo_vari from '@src/assets/logo_vari.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginRequired = (): JSX.Element => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="px-4 p-3 h-100 overflow-auto text-center">
			<div className="d-flex justify-content-center">
				<img
					className="w-100"
					style={{ maxWidth: '500px' }}
					src={logo_vari}
				/>
			</div>
			{t('general.loginRequiredForAccess')}
			<div className="mt-2">
				<Button onClick={() => navigate('/login')} className="btn-pink">
					{t('general.login')}
				</Button>
			</div>
		</div>
	);
};

export default LoginRequired;
