import styled from 'styled-components';
import imgBg from '/assets/bg-banner.jpeg';

interface BannerProps {
	height: string;
	fontSize: string;
}

const Banner = styled.figure<BannerProps>`
	height: ${(props) => props.height};
	background-image: url(${imgBg});
	display: flex;
	justify-content: center;
	align-items: center;

	& > h1,
	h2 {
		font-size: ${(props) => props.fontSize};
	}
`;

export default Banner;
