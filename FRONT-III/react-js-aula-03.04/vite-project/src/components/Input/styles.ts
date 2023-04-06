import styled from 'styled-components';

const CustomInput = styled.input`
	width: 50%;
	padding: 24px;
	background-color: #e6e6e6;
	border-radius: ${(props) => props.theme.borderRadius.sm};
	border: none;
	font-size: ${(props) => props.theme.fontSizes.md};

	&:focus {
		outline: none;
	}

	@media (max-width: 800px) {
		width: 80%;
	}
`;

export default CustomInput;
