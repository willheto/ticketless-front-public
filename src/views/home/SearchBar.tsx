import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { IoSearchOutline, IoOptionsOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

type PropTypes = {
	setSearchTerm: (searchTerm: string) => void;
	setShowFilterModal: (showFilterModal: boolean) => void;
	eventTypeFilter: string;
	locationFilter: string;
};

const SearchBar = (props: PropTypes): JSX.Element => {
	const {
		setSearchTerm,
		setShowFilterModal,
		eventTypeFilter,
		locationFilter,
	} = props;

	const { t } = useTranslation();
	return (
		<InputGroup
			style={{
				borderRadius: '5px',
			}}
			className="border shadow-sm"
		>
			<InputGroup.Text
				style={{
					backgroundColor: 'white',
					paddingRight: '0',
					paddingLeft: '10px',
					border: 'none',
				}}
				id="basic-addon1"
			>
				<IoSearchOutline size={25} />
			</InputGroup.Text>

			<Form.Control
				style={{ border: 'none', fontSize: '16px' }}
				placeholder={t('events.searchEvents')}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<InputGroup.Text
				style={{
					backgroundColor: 'white',
					paddingLeft: '0',
					border: 'none',
					paddingRight: '10px',
				}}
				id="basic-addon1"
				onClick={() => setShowFilterModal(true)}
			>
				<IoOptionsOutline
					size={25}
					style={
						eventTypeFilter !== '' || locationFilter !== ''
							? { color: '#f24594' }
							: {}
					}
				/>
			</InputGroup.Text>
		</InputGroup>
	);
};

export default SearchBar;
