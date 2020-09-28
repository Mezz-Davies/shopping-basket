import React, { useEffect, useReducer } from 'react';
import Styled from 'styled-components';

import Main from './Main';
import GetProducts from './services/GetProducts';

const MainContainer = Styled.main`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`

function App() {
	const [ State, Dispatch ] = useReducer(MainReducer, InitialState);
	const { Products } = State;
	// Load in products on start
	useEffect(()=>{
		Dispatch(FetchProductsAction());
	}, [])
	
	console.log(Products);
	return (
		<MainContainer>
			<Main Products={Products}/>
		</MainContainer>
	);
}

const FetchProductsAction = () => {
	const Products = GetProducts();
	return { type : UPDATE_PRODUCTS, Products }
}
const MainReducer = ( state=InitialState, action) => {
	switch( action.type ){
		case UPDATE_PRODUCTS:
			return Object.assign({}, state, {
				Products : action.Products
			})
		default:
			return state;
	}
}

const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

const InitialState = {
	Products : []
}

export default App;
