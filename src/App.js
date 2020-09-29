import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useReducer } from 'react';
import Styled from 'styled-components';
import Main from './Main';
import { StyledButton } from './Main/components/StyledComponents';
import GetProducts from './services/GetProducts';

const AppContainer = Styled.main`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
`
const PaymentContainer = Styled.div`
	position: absolute;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: rgba(255,255,255,0.9);
	color: #02661c;
	&>svg{
		font-size: 10em;
	}
	&>div{
		font-size: 5em;
		margin-bottom: 1em;
	}
	&>button{
		font-size: 1.5em;
	}
`
/**
 * Generic wrapper for the basket component to mimic wider application.
 */
function App() {
	const [ State, Dispatch ] = useReducer(MainReducer, InitialState);
	const { Products, PaymentInProgress } = State;
	// Load in products on start
	useEffect(()=>{
		Dispatch(FetchProductsAction());
	}, [])
	
	/**
	 * Function to initialise the payment process.
	 * @param {object} ItemsInBasket 
	 * @param {string} SelectedCurrency 
	 */
	const InitPayment = (ItemsInBasket, SelectedCurrency) => {
		if( Object.keys(ItemsInBasket).length > 0 ){
			Dispatch(InitPaymentAction(ItemsInBasket, SelectedCurrency));
		}
	}
	const CancelPayment = () => {
		Dispatch(CancelPaymentAction());
	}
	return (
		<AppContainer>
			<Main Products={Products} InitPayment={InitPayment}/>
			{ 
				PaymentInProgress 
				&& 
				<PaymentContainer>
					<FontAwesomeIcon icon={faCheckCircle} />
					<div>Now paying!</div>
					<StyledButton onClick={CancelPayment}>Go Back</StyledButton>
				</PaymentContainer> 
			}
		</AppContainer>
	);
}

export const FetchProductsAction = () => {
	const Products = GetProducts();
	return { type : AppConstants.UPDATE_PRODUCTS, Products };
}
export const InitPaymentAction = ( ItemsInBasket, SelectedCurrency ) => {
	return { type : AppConstants.INIT_PAYMENT, PaymentOptions : { ItemsInBasket, SelectedCurrency } };
}
export const CancelPaymentAction = () => {
	return { type : AppConstants.CANCEL_PAYMENT };
}
export const MainReducer = ( state=InitialState, action) => {
	switch( action.type ){
		case AppConstants.UPDATE_PRODUCTS:
			return Object.assign({}, state, {
				Products : action.Products
			});
		case AppConstants.INIT_PAYMENT:
			return Object.assign({}, state, {
				PaymentInProgress : true,
				PaymentOptions : action.PaymentOptions
			});
		case AppConstants.CANCEL_PAYMENT:
			return Object.assign({}, state, {
				PaymentInProgress : false,
				PaymentOptions : {}
			});
		default:
			return state;
	}
}

export const AppConstants = {
	UPDATE_PRODUCTS : 'UPDATE_PRODUCTS',
	INIT_PAYMENT  : 'INIT_PAYMENT',
	CANCEL_PAYMENT : 'CANCEL_PAYMENT'
}

export const InitialState = {
	Products : [],
	PaymentInProgress : false,
	PaymentOptions : {}
}

export default App;
