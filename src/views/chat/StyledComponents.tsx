import styled from 'styled-components';

export const MessageStyle = styled.div`
	.message {
		display: flex;
		flex-direction: column;
		margin: 0 auto 0;
		max-width: 600px;
		background-color: transparent;
	}

	.message div.container {
		border-radius: 1.15rem;
		line-height: 1.25;
		max-width: 75%;
		padding: 0.5rem 0.875rem;
		position: relative;
		word-wrap: break-word;
	}

	.message div::before,
	.message div::after {
		bottom: -0.1rem;
		content: '';
		height: 1rem;
		position: absolute;
	}

	.message div.from-me {
		align-self: flex-end;
		background-color: rgb(242 69 148);
		color: #fff;
	}

	.message div.from-me::before {
		border-bottom-left-radius: 0.8rem 0.7rem;
		border-right: 1rem solid rgb(242 69 148);
		right: -0.35rem;
		transform: translate(0, -0.1rem);
	}

	.message div.from-me::after {
		background-color: #fff;
		border-bottom-left-radius: 0.5rem;
		right: -40px;
		transform: translate(-30px, -2px);
		width: 10px;
	}

	.message div[class^='from-'] {
		margin: 0;
		width: fit-content;
	}

	.message div.from-me ~ div.from-me {
		margin: 0.25rem 0 0;
	}

	.message div.from-me ~ div.from-me:not(:last-child) {
		margin: 0.25rem 0 0;
	}

	.message div.from-me ~ div.from-me:last-child {
		margin-bottom: 0.5rem;
	}

	.message div.from-them {
		align-items: flex-start;
		background-color: #e5e5ea;
		color: #000;
	}

	.message div.from-them:before {
		border-bottom-right-radius: 0.8rem 0.7rem;
		border-left: 1rem solid #e5e5ea;
		left: -0.35rem;
		transform: translate(0, -0.1rem);
	}

	.message div.from-them::after {
		background-color: #fff;
		border-bottom-right-radius: 0.5rem;
		left: 20px;
		transform: translate(-30px, -2px);
		width: 10px;
	}

	.message div.from-them ~ div.from-them {
		margin: 0.25rem 0 0;
	}

	.message div.from-them ~ div.from-them:not(:last-child) {
		margin: 0.25rem 0 0;
	}

	.message div[class^='from-'].emoji {
		background: none;
	}

	.message div[class^='from-'].emoji::before {
		content: none;
	}

	.message .no-tail::before {
		display: none;
	}

	.message .margin-b_none {
		margin-bottom: 0 !important;
	}

	.message .margin-b_one {
		margin-bottom: 1rem !important;
	}

	.message .margin-t_one {
		margin-top: 1rem !important;
	}
`;
