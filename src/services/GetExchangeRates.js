export const getExchangeRates = async () => {
	const requestHeaders = new Headers();
	console.log(process.env.CURRENCY_API_ACCESS_KEY)
	requestHeaders.append("apikey", process.env.REACT_APP_CURRENCY_API_ACCESS_KEY);

	const requestOptions = {
		method: 'GET',
		  redirect: 'follow',
		headers: requestHeaders
	}

	try {
		const result = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=GBP', requestOptions);
		const resultJson = await result.json();
		const {success, rates, error} = resultJson;
		if(success){
			return {rates};
		} else {
			throw new Error(error.info);
		}
	} catch(err) {
		console.error(err)
	}
}
export default getExchangeRates;