import React, { ReactNode } from 'react';
import TopBar from '@src/components/layout/TopBar';
import NavigationBar from '@src/components/layout/NavigationBar';
import Skeleton from 'react-loading-skeleton';
import LoginRequired from '@src/components/layout/LoginRequired';
import useMediaQuery from '@src/components/hooks/useMediaQuery';
import {
	StyledDesktopToolBarWrapper,
	StyledView,
	StyledViewContentContainer,
	StyledViewContent,
	SkeletonContainer,
	StyledAdditionalTopBarWrapper,
} from '@src/components/layout/StyledComponents';

type TopBarProps = {
	header: string;
	customContent?: JSX.Element | null;
	allowBack?: boolean;
	allowShare?: boolean;
	useLogo?: boolean;
	onShare?: () => void;
};

type ViewProps = {
	showTopBar?: boolean;
	showToolBar?: boolean;
	topBarProps?: TopBarProps;
	customTopBar?: ReactNode;
	customToolBar?: ReactNode;
	children?: ReactNode;
	suspend?: boolean;
	requireLogin?: boolean;
};

const View = ({
	showTopBar = true,
	showToolBar = true,
	suspend,
	topBarProps,
	customToolBar,
	requireLogin,
	children,
}: ViewProps): JSX.Element => {
	const isDesktop = useMediaQuery('(min-width: 1140px)');

	return (
		<StyledView>
			{showTopBar && (
				<>
					<TopBar
						isDesktop={isDesktop}
						{...topBarProps}
						customContent={
							topBarProps?.customContent &&
							!requireLogin &&
							!isDesktop
								? topBarProps.customContent
								: null
						}
					/>
					{isDesktop && topBarProps?.customContent && (
						<StyledAdditionalTopBarWrapper>
							<div className="content">
								{topBarProps.customContent}
							</div>
						</StyledAdditionalTopBarWrapper>
					)}
				</>
			)}
			<StyledViewContentContainer
				$suspend={suspend}
				$isDesktop={isDesktop}
				id="view-content"
			>
				<StyledViewContent>
					{suspend ? (
						<SkeletonContainer>
							<Skeleton count={10} height={80} />
						</SkeletonContainer>
					) : (
						<>
							{requireLogin ? <LoginRequired /> : <>{children}</>}
						</>
					)}
				</StyledViewContent>
			</StyledViewContentContainer>
			{isDesktop ? (
				<StyledDesktopToolBarWrapper>
					<div className="desktop-toolbar-content">
						{customToolBar}
					</div>
				</StyledDesktopToolBarWrapper>
			) : (
				<>
					{showToolBar && (
						<>{customToolBar ? customToolBar : <NavigationBar />}</>
					)}
				</>
			)}
		</StyledView>
	);
};

export default View;
