import React from 'react';
import Styled from 'styled-components';

const NumberCell = Styled.div`
	justify-self: center;
`

const ProductRow = ({ProductId, Name, UnitOfMeasure, NumInBasket, UpdateBasketValue }) => {
	return (
		<>
			<div>{Name}<small>({UnitOfMeasure})</small></div>
			<button onClick={()=>UpdateBasketValue(ProductId, NumInBasket+1)}>+</button>
			<NumberCell>{NumInBasket}</NumberCell>
			<button onClick={()=>UpdateBasketValue(ProductId, NumInBasket-1)}>-</button>
		</>
	)
}
export default ProductRow;