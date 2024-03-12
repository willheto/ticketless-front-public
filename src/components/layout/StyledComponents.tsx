import styled from 'styled-components';

//
// View.tsx
//

const StyledDesktopToolBarWrapper = styled.div`
	display: flex;
	justify-content: center;

	.desktop-toolbar-content {
		width: 100%;
		max-width: 700px;
	}
`;

const StyledView = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const StyledViewContentContainer = styled.div<{
	$suspend?: boolean;
	$isDesktop?: boolean;
}>`
	${({ $suspend }: { $suspend?: boolean }): string =>
		$suspend ? 'overflow: hidden;' : 'overflow-y: auto;'}
	scrollbar-gutter: stable both-edges;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	padding: 16px;
	${({ $isDesktop }: { $isDesktop?: boolean }): string =>
		$isDesktop ? 'padding-top: 24px;' : ''}
`;

const StyledViewContent = styled.div`
	width: clamp(250px, 100%, 700px);
`;

const SkeletonContainer = styled.div`
	overflow: hidden;
	flex: 1;
`;

const StyledAdditionalTopBarWrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	.content {
		flex: 1;
		display: flex;
		justify-content: center;
		max-width: 700px;
	}
`;

//
// TopBar.tsx
//

const StyledTopBarContainer = styled.div<{
	$isDesktop: boolean;
	$isCustomContent: boolean;
}>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8px;
	width: 100%;
	${(props): string =>
		props.$isDesktop ? '' : 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);'}
	z-index: 999;
	background-color: #f24594;
	padding: 0 16px;
	padding-top: 12px;
	background-color: ${(props): string =>
		props.$isDesktop ? '#f24594' : 'white'};
	padding-bottom: ${(props): string =>
		props.$isCustomContent ? '0px' : '12px'};
`;

const StyledDefaultContent = styled.div<{
	$isDesktop: boolean;
	$isCustomContent: boolean;
}>`
	min-height: 26.5px;
	background-color: ${(props): string =>
		props.$isDesktop ? '#f24594' : 'white'};
	display: flex;
	flex: 1;
	justify-content: space-between;
	align-items: center;
`;

const StyledTopBarContent = styled.div`
	width: clamp(250px, 100%, 700px);
`;

//
// NavigationBar.tsx
//

const NavigationBarWrapper = styled.div`
	min-height: calc(env(safe-area-inset-bottom) + 55px);
	height: calc(env(safe-area-inset-bottom) + 55px);
	width: 100%;
	padding-bottom: env(safe-area-inset-bottom);
	${(props): string =>
		props.theme.isDesktop &&
		!props.theme.forceDisplay &&
		'display: none !important;'}
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

export {
	StyledView,
	StyledViewContentContainer,
	StyledViewContent,
	SkeletonContainer,
	StyledAdditionalTopBarWrapper,
	StyledDesktopToolBarWrapper,
	StyledTopBarContainer,
	StyledDefaultContent,
	StyledTopBarContent,
	NavigationBarWrapper,
};
