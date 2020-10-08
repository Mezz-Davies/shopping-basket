export const getExchangeRates = () => {
	return fetch('https://api.exchangeratesapi.io/latest?base=GBP').then(
		Response => {
			if( !Response.ok ){
				throw new Error('Fetch Error');
			}
			return Response.json();
		}
	)
}
export default getExchangeRates;