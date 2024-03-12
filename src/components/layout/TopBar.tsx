import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { BsShare } from 'react-icons/bs';
import logo_vari from '@src/assets/logo_vari_cropped.svg';
import logo_pink_whiteBg from '@src/assets/logo_pink_whiteBg.svg';
import NavigationBar from './NavigationBar';
import {
	StyledTopBarContainer,
	StyledTopBarContent,
	StyledDefaultContent,
} from './StyledComponents';

type PropTypes = {
	isDesktop: boolean;
	header?: string;
	allowBack?: boolean;
	allowShare?: boolean;
	useLogo?: boolean;
	customContent?: JSX.Element | null;
	onShare?: () => void;
};

const TopBar = (props: PropTypes): JSX.Element => {
	const {
		header,
		allowBack,
		allowShare,
		useLogo,
		onShare,
		customContent,
		isDesktop,
	} = props;

	const navigate = useNavigate();

	return (
		<StyledTopBarContainer
			$isDesktop={isDesktop}
			$isCustomContent={!!customContent}
		>
			<StyledTopBarContent>
				<StyledDefaultContent
					$isDesktop={isDesktop}
					$isCustomContent={!!customContent}
				>
					{allowBack !== false && !isDesktop ? (
						<span>
							<IoArrowBackOutline
								style={{ cursor: 'pointer' }}
								size={25}
								onClick={() => navigate(-1)}
							/>
						</span>
					) : !isDesktop ? (
						<div style={{ width: '25px' }} />
					) : null}
					{useLogo ? (
						<img
							style={{ height: isDesktop ? '30px' : '30px' }}
							src={isDesktop ? logo_pink_whiteBg : logo_vari}
							alt="logo"
						/>
					) : (
						<h3
							style={
								isDesktop
									? { color: 'white', marginBottom: '0px' }
									: {
											marginBottom: '0px',
											textOverflow: 'ellipsis',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
										}
							}
						>
							{header}
						</h3>
					)}

					{allowShare && onShare && !isDesktop ? (
						<span>
							<BsShare size={23} onClick={() => onShare()} />
						</span>
					) : (
						<div style={{ width: '25px' }} />
					)}
					{isDesktop && (
						<div style={{ width: '400px' }}>
							<NavigationBar forceDisplay={true} />
						</div>
					)}
				</StyledDefaultContent>
				{customContent && (
					<div className="d-flex justify-content-center">
						{customContent}
					</div>
				)}
			</StyledTopBarContent>
		</StyledTopBarContainer>
	);
};

export default TopBar;
