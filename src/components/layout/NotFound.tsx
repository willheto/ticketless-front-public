import React from 'react';
import View from '@src/components/layout/View';

const NotFound = (): JSX.Element => {
	return (
		<View
			topBarProps={{
				header: 'general.events',
				allowBack: false,
				useLogo: true,
			}}
		>
			<div className="h-100 d-flex align-items-center justify-content-center">
				<h3>404 - Page doesn't exist</h3>
			</div>
		</View>
	);
};

export default NotFound;
