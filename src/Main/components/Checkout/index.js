import React, { Fragment, useState, useEffect } from 'react';
import Styled from 'styled-components';
import {ButtonContainer, StyledButton} from '../ButtonRow';

const TotalRow = Styled.div`
	font-size: 2em;
`
const BasketBreakdownGrid = Styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
`
const CurrencySelectionRow = Styled.div`

`
const Checkout = ({Items, Products, ToBasket}) => {
	const [ SelectedCurrency, SetSelectedCurrency ] = useState('GBP');

	const [ IsLoading, SetIsLoading ] = useState(false);
	const [ CurrencyOptions, SetCurrencyOptions ] = useState([]);

	useEffect(()=>{
		SetIsLoading(true);
		fetch('https://api.exchangeratesapi.io/latest?base=GBP').then(
			Response => {
				if( !Response.ok ){
					throw new Error('Fetch Error');
				}
				return Response.json();
			}
		).then(
			ExchangeRates => {
				const { rates } = ExchangeRates;
				SetCurrencyOptions(rates);
			}
		).catch(
			Err => {
				console.error(Err);
			}
		).finally(
			SetIsLoading(false)
		)
	}, [])

	const CostRows = Products.filter(Product=>{
			const { pid } = Product;
			return Items[pid] > 0;
		}).map(
			Product=>{
				const { pid, name, GBP_price, UnitOfMeasure } = Product;
				const ProductCount = Items[pid];
				const ProductName = name;
				const ProductCost = GBP_price * ProductCount * CurrencyOptions[SelectedCurrency];
				const ProductCostString = ProductCost.toLocaleString('en-GB', {
					style: 'currency',
					currency: SelectedCurrency
				});
				const IndividualCostString = (GBP_price * CurrencyOptions[SelectedCurrency]).toLocaleString('en-GB', {
					style: 'currency',
					currency : SelectedCurrency
				});
				return(
					<Fragment key={pid}>
						<div>{ProductName}</div>
						<div>{IndividualCostString} per {UnitOfMeasure}</div>
						<div>{ProductCostString}</div>
					</Fragment>
				)
			}
		);
	const TotalCost = Products.reduce(
			(CumulativeTotal, Product)=>{
				const { pid, GBP_price } = Product;
				const ProductCount = Items[pid];
				if( ProductCount ){
					CumulativeTotal += ( ProductCount * GBP_price  * CurrencyOptions[SelectedCurrency] );
				}
				return CumulativeTotal;
			}, 0
		).toLocaleString('en-GB', {
			style : 'currency',
			currency : SelectedCurrency
		});

	return (
		<div>
			<h1>Checkout</h1>
			<div>
				<TotalRow>Total Cost : {TotalCost}</TotalRow>
				<CurrencySelectionRow>
					Select which currency you'd like to use : <select onChange={(e)=>{ console.log(e.currentTarget.value); SetSelectedCurrency(e.currentTarget.value)}} value={SelectedCurrency}>
						{
							Object.keys(CurrencyOptions).sort().map(
								CurrencyKey => <option key={CurrencyKey} value={CurrencyKey}>{CurrencyKey}</option>
							)
						}
					</select>
				</CurrencySelectionRow>
			</div>
			{
				CostRows.length > 0 ?
					<BasketBreakdownGrid>
						{CostRows}
					</BasketBreakdownGrid>
					:
					<div>No Products in Basket</div>
			}
			<ButtonContainer>
				<StyledButton onClick={ToBasket}>To Basket</StyledButton>
				<StyledButton onClick={ToBasket}>To Basket</StyledButton>
			</ButtonContainer>
		</div>
	)
}
export default Checkout;