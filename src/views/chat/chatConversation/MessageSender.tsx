import React, { useRef, useState } from 'react';
import { IoClose, IoAdd, IoSend } from 'react-icons/io5';
import { Form, Button, Modal } from 'react-bootstrap';
import Report from '../../report/Report';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const StyledTextareaAutosize = styled(TextareaAutosize)`
	resize: none;
	overflow: hidden;
	border-radius: 5px;
	border: 1px solid #ced4da;
	font-size: 16px !important;
	height: 36px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 5px;
	padding-right: 5px;
	min-height: 36px;
	z-index: 1000;

	&:focus {
		outline: none;
	}
`;

type MessageSenderPropTypes = {
	messageContent: string;
	setMessageContent: (message: string) => void;
	sendMessage: (isPayment?: boolean) => void;
	isSending: boolean;
	scrollToBottom: (force?: boolean) => void;
	user: UserInterface;
	receiverID: number;
};

const MessageSender = ({
	messageContent,
	setMessageContent,
	sendMessage,
	isSending,
	scrollToBottom,
	user,
	receiverID,
}: MessageSenderPropTypes): JSX.Element => {
	const [modalShow, setModalShow] = useState<boolean>(false);
	const [isReporting, setIsReporting] = useState<boolean>(false);
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<div
				className="d-flex align-items-center border-top px-2 mb-2 "
				style={{
					height: 'calc(env(safe-area-inset-bottom) + 55px)',
					paddingTop: '10px',
					paddingBottom: 'calc(env(safe-area-inset-bottom) + 5px)',
				}}
			>
				<div
					onClick={() => {
						setModalShow(!modalShow);
						setTimeout(() => {
							scrollToBottom(true);
						}, 50);
					}}
					style={{
						minWidth: '36px',
						maxWidth: '36px',
						aspectRatio: '1',
						borderColor: '#ced4da !important',
						backgroundColor: 'white',
					}}
					className="border d-flex justify-content-center align-items-center rounded-circle me-2"
				>
					{modalShow ? (
						<IoClose className="h-75 w-100" />
					) : (
						<IoAdd className="h-75 w-100" />
					)}
				</div>
				<StyledTextareaAutosize
					maxRows={1}
					className="w-100  me-2"
					placeholder={t('chat.chatPlaceHolder')}
					value={messageContent}
					maxLength={4096}
					onChange={event => setMessageContent(event.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter' && !isSending && !isMobile) {
							e.preventDefault();
							sendMessage();
						}
					}}
					// @ts-expect-error - Typings are incorrect
					ref={inputRef}
				/>

				<div
					onClick={e => {
						e.preventDefault();
						if (!isSending) {
							sendMessage();
							if (inputRef.current !== null) {
								inputRef.current.focus();
							}
						}
					}}
					style={
						isSending
							? {
									opacity: 0.5,
									minWidth: '40px',
									maxWidth: '40px',
									aspectRatio: '1',
									borderColor: '#ced4da',
									backgroundColor: 'white',
								}
							: {
									minWidth: '40px',
									maxWidth: '40px',
									aspectRatio: '1',
									borderColor: '#ced4da',
									backgroundColor: 'white',
								}
					}
					className=" d-flex justify-content-center align-items-center"
				>
					<IoSend className="w-100" style={{ height: '26px' }} />
				</div>
			</div>

			{
				// Modal on bottom
			}
			<Modal
				show={modalShow}
				className="d-flex flex-column justify-content-end"
				onHide={() => {
					setModalShow(false);
					setIsReporting(false);
				}}
			>
				<div className="d-flex flex-column px-4 p-3 gap-2">
					{isReporting ? (
						<Report
							setModalShow={setModalShow}
							setIsReporting={setIsReporting}
							reporterID={user.userID}
							reportedID={receiverID}
						/>
					) : (
						<>
							{isMobile && (
								<div className="d-flex flex-column">
									<Button
										className={
											'd-flex align-items-center justify-content-center w-100 btn-pink'
										}
										onClick={() => {
											setModalShow(false);
											sendMessage(true);
										}}
										disabled={!user?.phoneNumber}
									>
										<Form.Label>
											{t('chat.sendPaymentLink')}
										</Form.Label>
									</Button>
									{!user?.phoneNumber && (
										<Form.Text className="text-muted mt-0 text-center">
											{t('chat.addPhoneNumber')}
										</Form.Text>
									)}
								</div>
							)}
							<Button
								className={
									'd-flex align-items-center justify-content-center w-100 btn-pink'
								}
								onClick={() => {
									setIsReporting(true);
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
						</>
					)}
				</div>
			</Modal>
		</>
	);
};

export default MessageSender;
