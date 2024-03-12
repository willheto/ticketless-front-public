import React, { useState } from 'react';
import { BsDot } from 'react-icons/bs';

const UserTypingIndicator = (): JSX.Element => {
	const [dot, setDot] = useState<number>(0);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setDot(prevCount => (prevCount + 1) % 3);
		}, 250);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="d-flex" style={{ display: 'inline' }}>
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ width: '25px' }}
			>
				{dot === 0 ? <BsDot size={25} /> : <BsDot size={20} />}
			</div>
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ width: '25px' }}
			>
				{dot === 1 ? <BsDot size={25} /> : <BsDot size={20} />}
			</div>
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ width: '25px' }}
			>
				{dot === 2 ? <BsDot size={25} /> : <BsDot size={20} />}
			</div>
		</div>
	);
};

export default UserTypingIndicator;
