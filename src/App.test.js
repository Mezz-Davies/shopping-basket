import React from 'react';
import { render } from '@testing-library/react';
import App, {FetchProductsAction, InitPaymentAction, MainReducer, InitialState, AppConstants } from './App';

test('App reducer test', ()=>{
	const TestStart = MainReducer(InitialState, {});
	expect(TestStart).toEqual(InitialState);

	const TestProduct = {
		pid : "001",
		name : "Test",
		GBP_price : 1,
		UnitOfMeasure : { 
			single : 'test',
			plural : 'test'
		}
	}
	const AfterTestProductAddTest = MainReducer(InitialState, {type: AppConstants.UPDATE_PRODUCTS, Products : [TestProduct]});
	expect( AfterTestProductAddTest.Products[0]).toEqual(TestProduct);

	const AfterFetchProducts = MainReducer(InitialState, FetchProductsAction() );
	expect( AfterFetchProducts.Products.length ).toEqual(4);

	const AfterPayment = MainReducer(InitialState, InitPaymentAction({'001':1}, 'GBP'));
	expect( AfterPayment.PaymentInProgress ).toEqual(true);
	expect( AfterPayment.PaymentOptions.SelectedCurrency ).toEqual('GBP');
	expect( AfterPayment.PaymentOptions.ItemsInBasket ).toEqual({'001':1});
});

test('App render', ()=>{
	render(<App />);
});