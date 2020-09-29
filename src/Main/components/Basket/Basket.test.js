import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Basket from './index';

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

test('Render Basket', ()=>{
	var CheckoutClicked = 0;
	const IncrementCheckoutClick = () => {
		CheckoutClicked += 1;
	}
	const { getByText } = render(<Basket Products={Products} Items={Items} UpdateBasketValue={()=>{}} ToCheckout={IncrementCheckoutClick}/>);

	const titleElement = getByText(/Basket/i);
	expect(titleElement).toBeInTheDocument();

	const CheckoutButton = getByText(/To Checkout/i);
	expect(CheckoutButton).toBeInTheDocument();

	fireEvent.click(CheckoutButton);
	expect(CheckoutClicked).toEqual(1);
})