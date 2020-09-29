import React, { Fragment, useState, useEffect } from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {ButtonContainer, StyledButton, StyledHeader} from '../StyledComponents';

const TotalRow = Styled.div`
	font-size: 2em;
	margin-bottom: 0.25em;
`
const CurrencySelectionRow = Styled.div`
	font-size: 1.25em;
	&>select{
		font-size: 1rem;
	}
`
const BasketBreakdownGrid = Styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto auto;
	padding: 0.5rem;
`
const ItemTitleRow = Styled.div`
	grid-column: 2/span 4;
	font-size: 1.5em;
	border-bottom: 1px solid white;
`

const CostCell = Styled.div`
	text-align: right;
`
const UnitOfMeasureCell = Styled.div`
	text-align: left;
	margin-left: 0.5rem;
`
/**
 * 
 * @param {array} Products array of products { pid, name, GBP_price, UnitOfMeasure : { single, plural }}
 * @param {object} Items key-value pair object of productId : Number in basket
 * @param {function} ToBasket Callback to change view to Basket
 */
const Checkout = ({Products, Items, ToBasket, InitPayment}) => {
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
						<div></div>
						<div>{ProductName}</div>
						<CostCell>{IndividualCostString}</CostCell>
						<UnitOfMeasureCell>per {UnitOfMeasure.single}</UnitOfMeasureCell>
						<div>{ProductCostString}</div>
						<div></div>
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

	const ConveryCurrencyKeyToOptionText = (CurrencyKey) => {
		const regex = /0./gi;
		return (0).toLocaleString('en-GB', {
			style : 'currency',
			currency : CurrencyKey,
			currencyDisplay: 'name'
		}).replace(regex, '').trim();
	}

	return (
		<div>
			<StyledHeader>Checkout</StyledHeader>
			<div>
				<TotalRow>Total Cost : {TotalCost}</TotalRow>
				<CurrencySelectionRow>
					{ IsLoading ?
						<></>
						:
						<>
							Select which currency you'd like to use : <select onChange={(e)=>SetSelectedCurrency(e.currentTarget.value)} value={SelectedCurrency}>
							{
								Object.keys(CurrencyOptions).sort().map(
									CurrencyKey => <option key={CurrencyKey} value={CurrencyKey}>{ConveryCurrencyKeyToOptionText(CurrencyKey)} ({CurrencyKey})</option>
								)
							}
						</select>
						</>
					}
					
				</CurrencySelectionRow>
			</div>
			{
				CostRows.length > 0 ?
					<BasketBreakdownGrid>
						<div></div><ItemTitleRow>Items in Basket</ItemTitleRow><div></div>
						{CostRows}
					</BasketBreakdownGrid>
					:
					<div>No Products in Basket</div>
			}
			<ButtonContainer>
				<StyledButton onClick={ToBasket}><FontAwesomeIcon icon={faArrowLeft}/> To Basket</StyledButton>
				<StyledButton onClick={()=>InitPayment(Items, SelectedCurrency)}>Pay Now <FontAwesomeIcon icon={faArrowRight}/></StyledButton>
			</ButtonContainer>
		</div>
	)
}
export default Checkout;