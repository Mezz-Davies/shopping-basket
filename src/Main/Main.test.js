import React from 'react';
import { render } from '@testing-library/react';
import Main from './index';
import { MainReducer, InitialState } from './reducer';
import { ToggleCheckout, UpdateBasketValue } from './actions';

const TestProducts = [
	{
		pid : '001',
		name : 'Test',
		GBP_Price : 1,
		UnitOfMeasure : {
			single : 'test',
			plural : 'tests'
		}
	}
];
test('Render check', () => {
	const { getByText } = render(<Main Products={TestProducts}/>);
	const ToCheckoutButton = getByText(/To Checkout/i);
	expect(ToCheckoutButton).toBeInTheDocument();

	const ToBasketButton = getByText(/To Basket/i);
	expect(ToBasketButton).toBeInTheDocument();
});

test('Reducer and Actions check', ()=>{
	const TestStart = MainReducer(InitialState, {});
	expect(TestStart).toEqual(InitialState);

	const AfterCheckoutToggle = MainReducer(InitialState, ToggleCheckout(true) );
	expect(AfterCheckoutToggle.ShowCheckout).toEqual(true);

	const AfterUpdateBasketValue = MainReducer(InitialState, UpdateBasketValue('001', 2));
	expect(AfterUpdateBasketValue.BasketItems).toHaveProperty('001');
	expect(AfterUpdateBasketValue.BasketItems['001']).toEqual(2);
});