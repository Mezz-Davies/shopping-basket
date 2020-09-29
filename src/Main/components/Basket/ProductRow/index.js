import React from 'react';
import Styled from 'styled-components';
import { StyledButton } from '../../StyledComponents';

const NumberCell = Styled.div`
	justify-self: center;
	min-width: 50px;
	padding: 0 0.5em;
	-webkit-user-select: none;  
	-moz-user-select: none;    
	-ms-user-select: none;      
	user-select: none;
	align-self: center;
`
const NameCell = Styled.div`
	font-size: 1.25em;
	text-align: right;
	font-weight: 700;
`
const ByTheCell = Styled.div`
	font-size: 0.5em;
	font-weight: 400;
	align-self: center;
	text-align: left;
`

const ProductRow = ({ProductId, Name, UnitOfMeasure, NumInBasket, UpdateBasketValue }) => {
	const NumberCellContent = NumInBasket < 1 ? "0" : `${NumInBasket} ${( NumInBasket > 1 ? UnitOfMeasure.plural : UnitOfMeasure.single )}`;
	return (
		<>
			<NameCell>{Name}</NameCell>
			<ByTheCell>{`(by the ${UnitOfMeasure.single})`}</ByTheCell>
			<StyledButton id={`${ProductId}-minus`} onClick={()=>UpdateBasketValue(ProductId, NumInBasket-1)}>-</StyledButton>
			<NumberCell id={`${ProductId}-number`}>{`${NumberCellContent}`}</NumberCell>
			<StyledButton id={`${ProductId}-plus`} onClick={()=>UpdateBasketValue(ProductId, NumInBasket+1)}>+</StyledButton>
		</>
	)
}
export default ProductRow;