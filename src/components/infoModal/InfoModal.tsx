import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const InfoModal = ({
	showModal,
	setShowModal,
	content,
	title,
}: {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	content: string;
	title: string;
}): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Modal
			show={showModal}
			onHide={() => setShowModal(false)}
			centered
			className="modal"
			size="lg"
		>
			<Modal.Body className="p-0">
				<div className="d-flex flex-column">
					<div className="p-4 text-center">
						<h3>{title}</h3>
						<p>{content}</p>
						<Button
							className="btn-pink w-50"
							onClick={() => setShowModal(false)}
						>
							{t('chat.chatCheaterNoticeOK')}
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default InfoModal;
