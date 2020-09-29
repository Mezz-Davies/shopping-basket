import React from 'react';
import { render } from '@testing-library/react';
import FlippingCard from './index';

test('Test flipping card : front shown', ()=>{
	const { getByText } = render(
		<FlippingCard IsFlipped={false}>
			<h1>Front</h1>
			<h1>Back</h1>
		</FlippingCard>);
	expect( getByText(/Front/i).parentElement.className ).toContain('show');
	expect( getByText(/Back/i).parentElement.className ).not.toContain('show');
});

test('Test flipping card : back shown', ()=>{
	const { getByText } = render(
		<FlippingCard IsFlipped={true}>
			<h1>Front</h1>
			<h1>Back</h1>
		</FlippingCard>);
	expect( getByText(/Front/i).parentElement.className ).not.toContain('show');
	expect( getByText(/Back/i).parentElement.className ).toContain('show');
});