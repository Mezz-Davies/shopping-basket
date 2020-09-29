import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkout from './index';

const Products = [{
	pid : '001',
	name : 'Test',
	GBP_price : 1,
	UnitOfMeasure : {
		single : 'test',
		plural : 'tests'
	}
}];

const Items = {
	'001' : 1
};

test('Checkout Element Test', ()=>{
	var BasketClicked = 0;
	const IncrementBasketClick = () => {
		BasketClicked += 1;
	}
	const PaymentFunctionTest = (TestItems, SelectedCurrency ) => {
		expect( TestItems ).toEqual(Items);
		expect( SelectedCurrency ).toEqual('GBP');
	} 
	const { getByText } = render( <Checkout Products={Products} Items={Items} ToBasket={IncrementBasketClick} InitPayment={PaymentFunctionTest}/> );

	const titleElement = getByText(/Checkout/i);
	expect(titleElement).toBeInTheDocument();

	const CheckoutButton = getByText(/To Basket/i);
	expect(CheckoutButton).toBeInTheDocument();

	fireEvent.click(CheckoutButton);
	expect(BasketClicked).toEqual(1);

	const PaymentButton = getByText(/Pay Now/i);
	fireEvent.click(PaymentButton);
});