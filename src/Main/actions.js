import MainConstants from './constants';

export const UpdateBasketValue = (pid, newValue)=>{
	return { type : MainConstants.UPDATE_BASKET_VALUE, pid, newValue }
}

export const ToggleCheckout = (newValue)=>{
	return { type : MainConstants.TOGGLE_CHECKOUT, newValue }
}

