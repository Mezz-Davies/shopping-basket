import React from 'react';
import Styled from 'styled-components';

import ProductRow from './ProductRow';
import {ButtonContainer, StyledButton} from '../ButtonRow';

const BasketContainer = Styled.div`
	
`
const ProductContainer = Styled.div`
	display: grid;
	grid-template-columns: 250px 50px 50px 50px;
	margin: auto;
	row-gap: 1em;
	font-size: 1.5em;
`

const BasketView = ({Products, Items, UpdateBasketValue, ToCheckout}) => {
	return(
		<BasketContainer>
			<h1>Basket</h1>
			<ProductContainer>
			{
				Products.map(Product=>
					<ProductRow 
						key={Product.pid} 
						ProductId={Product.pid} 
						Name={Product.name} 
						UnitOfMeasure={Product.UnitOfMeasure} 
						NumInBasket={Items[Product.pid] || 0} 
						UpdateBasketValue={UpdateBasketValue} 
						/>
				)
			}
			</ProductContainer>
			<ButtonContainer>
				<StyledButton onClick={ToCheckout}>To Checkout</StyledButton>
			</ButtonContainer>
		</BasketContainer>
	)
}
export default BasketView;