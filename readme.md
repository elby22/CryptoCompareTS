Typescript bindings for CryptoCompare's min-api.
This codebase is built to be implementation-agnostic, just providing types and request/response scaffolding.
For example: someone may choose Axios to make calls to the API. They can create a request by
    let request = new Price.SingleSymbolPrice.Request({ fsm: 'BTC', tsm: 'LTC'});
    let response: Price.SingleSymbolPrice.Response = await axios.get(request.url, request.parameters);
Not providing those parameters would throw an error on transpilation, or your IDE will make red squigglys at you.

For the actual documentation visit: https://min-api.cryptocompare.com/documentation
