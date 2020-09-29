import React, { useCallback, useReducer } from 'react';

import { MainReducer, InitialState } from './reducer';
import { ToggleCheckout, UpdateBasketValue } from './actions';
import { FlippingCard, Basket, Checkout } from './components';

/**
 * Flippable interface to contain and move between Basket and Checkout displays.
 * @param {object} Products [{ pid, name, GBP_price, UnitOfMeasure : { single, plural } }]
 */
const Main = ({Products, InitPayment}) => {
	const [ State, Dispatch ] = useReducer(MainReducer, InitialState );
	const { BasketItems, ShowCheckout } = State;

	const UpdateBasketValueCallback = useCallback((pid, newValue)=>{
		Dispatch( UpdateBasketValue(pid, newValue));
	}, []);

	const ToggleCheckoutCallback = useCallback((newValue)=>{
		Dispatch( ToggleCheckout(newValue) );
	}, []);

	return(
		<FlippingCard IsFlipped={ShowCheckout}>
			<Basket Products={Products} Items={BasketItems} UpdateBasketValue={UpdateBasketValueCallback} ToCheckout={()=>ToggleCheckoutCallback(!ShowCheckout)} />
			<Checkout Items={BasketItems} Products={Products} ToBasket={()=>ToggleCheckoutCallback(!ShowCheckout)} InitPayment={InitPayment}/>
		</FlippingCard>
	);
}
export default Main;