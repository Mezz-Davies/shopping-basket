import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductRow from './index';

const AddTestProductRowArgs = {
	ProductId : '001',
	Name : 'AddTest',
	UnitOfMeasure : {
		single : 'test',
		plural : 'tests'
	},
	NumInBasket : 1, 
}

test('renders with 1 and tests add button', () => {
	const PlusButtonEventTest = ( ProductId, NewValue ) => {
		expect(ProductId).toEqual('001');
		expect(NewValue).toEqual(2);
	}
	const { getByText } = render(<ProductRow {...AddTestProductRowArgs} UpdateBasketValue={PlusButtonEventTest} />);
	const titleElement = getByText(/AddTest/i);
	expect(titleElement).toBeInTheDocument();

	expect(getByText(/1 test/i)).toBeInTheDocument();

	const AddButton = getByText(/\+/i);
	expect(AddButton).toBeInTheDocument();
	fireEvent.click(AddButton);
});

const MinusTestProductRowArgs = {
	ProductId : '002',
	Name : 'MinusTest',
	UnitOfMeasure : {
		single : 'test',
		plural : 'tests'
	},
	NumInBasket : 2, 
}

test('renders with 2 and tests minus button', () => {
	const MinusButtonEventTest = ( ProductId, NewValue ) => {
		expect(ProductId).toEqual('002');
		expect(NewValue).toEqual(1);
	}
	const { getByText } = render(<ProductRow {...MinusTestProductRowArgs} UpdateBasketValue={MinusButtonEventTest} />);
	const titleElement = getByText(/MinusTest/i);
	expect(titleElement).toBeInTheDocument();

	expect(getByText(/2 tests/i)).toBeInTheDocument();

	const MinusButton = getByText(/-/i);
	expect(MinusButton).toBeInTheDocument();

	fireEvent.click(MinusButton);
});