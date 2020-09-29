import React from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ProductRow from './ProductRow';
import {ButtonContainer, StyledButton, StyledHeader} from '../StyledComponents';

const ProductContainer = Styled.div`
	display: grid;
	grid-template-columns: auto auto 50px auto 50px;
	margin: auto;
	row-gap: 1em;
	column-gap: 0.5em;
	font-size: 1.5em;
`

/**
 * 
 * @param {array} Products array of products { pid, name, GBP_price, UnitOfMeasure : { single, plural }}
 * @param {object} Items key-value pair object of productId : Number in basket
 * @param {function} UpdateBasketValue (productId, newValue)
 * @param {function} ToCheckout Callback to change view to Checkout
 */
const BasketView = ({Products, Items, UpdateBasketValue, ToCheckout}) => {
	return(
		<div>
			<StyledHeader>Basket</StyledHeader>
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
				<StyledButton onClick={ToCheckout}>To Checkout <FontAwesomeIcon icon={faArrowRight}/></StyledButton>
			</ButtonContainer>
		</div>
	)
}
export default BasketView;