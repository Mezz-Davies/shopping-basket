import Styled from 'styled-components';

export const ButtonContainer = Styled.div`
	padding: 1em 0;
	font-size: 2em;
	display: flex;
	justify-content: space-around;
`
export const StyledButton = Styled.button`
	color: white;
	font-size: 0.75em;
	padding: 0.5em 1em;
	border-radius: 8px;
	background: #4E89AE;
	border: 1px solid #5a9ec8;
	box-shadow:  5px 5px 10px #2f5268;
	outline: none;
	&:hover {
		box-shadow: inset 5px 5px 10px #2f5268, 
            		inset -5px -5px 10px #6dc0f4;
	}
`
export const StyledHeader = Styled.h1`
	padding: 0.5em 0;
	margin: 0;
	font-size: 2.75em;
`