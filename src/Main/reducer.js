/**
 * Actions:
 * AddToBasket
 * RemoveFromBasket
 */
import MainConstants from './constants';

export const InitialState = {
	BasketItems : {},
	ShowCheckout : false
}

export const MainReducer = ( state=InitialState, action ) => {
	switch( action.type ){
		case MainConstants.UPDATE_BASKET_VALUE:
			return Object.assign({}, state, 
				Object.assign( state.BasketItems, {
					[action.pid] : ( action.newValue > 0 ? action.newValue : 0 )
				})
			);
		case MainConstants.TOGGLE_CHECKOUT:
			return Object.assign({}, state, {
				ShowCheckout : action.newValue
			})
		default:
			return state;
	}
}
export default MainReducer;