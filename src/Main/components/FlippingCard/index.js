import React from 'react';
import Styled from 'styled-components';

const Card = Styled.div`
	width: 800px;
	height: 500px;
`
const CardInner = Styled.div`
	height: 100%;
	width: 100%;
	position: relative;	
`

const CardFace = Styled.div`
	height:100%;
	width:100%;
	position: absolute;
	transform: rotateY(180deg);
	transition: transform 1s;
	transform-style: preserve-3d;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	overflow : hidden;
	-webkit-box-shadow: 2px 0px 20px 4px rgba(0,0,0,0.2);
	-moz-box-shadow: 2px 0px 20px 4px rgba(0,0,0,0.2);
	box-shadow: 2px 0px 20px 4px rgba(0,0,0,0.2);
	border-radius 16px;

	&.show {
		transform: rotateY(0deg);
	}
	&.front {
		background-image: linear-gradient(to bottom right, #4E89AE, #43658B);
	}
	&.back {
		background-image: linear-gradient(to top left, #4E89AE, #43658B);
	}
	&>div{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content : space-between;
		text-align: center;
		color: white;
	}
`

/**
 * 
 * @param {Boolean} IsFlipped show front or back face of card
 * @param {any} children renders first 2 children shown
 */
const FlippingCard = ({IsFlipped, children}) => {
	return(
		<Card>
			<CardInner>
				<CardFace className={`front ${!IsFlipped ? 'show' : ''}`}>
					{ children[0] !== undefined && children[0] }
				</CardFace>
				<CardFace className={`back ${IsFlipped ? 'show' : ''}`}>
					{ children[1] !== undefined && children[1] }
				</CardFace>
			</CardInner>
		</Card>
	)
}
export default FlippingCard;