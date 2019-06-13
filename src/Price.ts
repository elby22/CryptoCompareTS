import { 
    APIRequest, 
    GlobalParameters, 
    baseURL,
    PriceData,
    PriceDataFull,
} from './types';

/**
 * Simple endpoints for getting price data for a coin
 */
export namespace Price{
    /**
     * Parameters used by every request in the Price API group
     */
    export interface BaseParameters{
        e?: string; // The exchange to obtain data from (our aggregated average - CCCAGG - by default) [ Min length - 2] [ Max length - 30] [ Default - CCCAGG]
    }
    /**
     *  Single Symbol Price
     * Get the current price of any cryptocurrency in any other currency that you need.
     * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. If the opposite pair trades we invert it (eg.: BTC-XMR)
     */
    export namespace SinglSymbolPrice{
        
        export interface RequestParameters extends GlobalParameters, BaseParameters{
            tryConversion?: boolean; //If set to false, it will try to get only direct trading values [ Default - true]
            fsym: string; //The cryptocurrency symbol of interest [ Min length - 1] [ Max length - 10]
            tsyms: string; //Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 500]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/price`;
            caching: 10; //Seconds
            params: RequestParameters;
        }
        
        export interface Response{
            [tsym: string]: number; //Symbol maps to price
        }
    }

    /**
     * Multiple Symbols Price
     * Same as single API path but with multiple from symbols.
     */
    export namespace MultipleSymbolsPrice{
        
        export interface RequestParameters extends GlobalParameters{
            tryConversion?: boolean; //If set to false, it will try to get only direct trading values [ Default - true]
            fsyms: string; //Comma separated cryptocurrency symbols list [ Min length - 1] [ Max length - 300]
            tsyms: string; //Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 100]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/pricemulti`;
            caching: 10; //Seconds
            params: RequestParameters;
        }
        
        export interface Response{
            [fysm: string]: { //Symbol maps to map of symbols
                [tsym: string]: number; //Symbol maps to price
            }; 
        }
    }

    /**
     * Multiple Symbols Price
     * Same as single API path but with multiple from symbols.
     */
    export namespace MultipleSymbolsFullData{

        export interface RequestParameters extends GlobalParameters{
            tryConversion?: boolean; //If set to false, it will try to get only direct trading values [ Default - true]
            fsyms: string; //Comma separated cryptocurrency symbols list [ Min length - 1] [ Max length - 1000]
            tsyms: string; // Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 100]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/pricemultifull`;
            caching: 10; 
            params: RequestParameters;
        }
        
        export interface Response{
            RAW: PriceDataFull;
            DISPLAY: any;
        }
    }

    /**
     * Generate Custom Average
     * Compute the current trading info (price, vol, open, high, low etc) of the requested pair as a volume weighted average based on the exchanges requested.
     */
    export namespace GenerateCustomAverage{

        export interface RequestParameters extends GlobalParameters{
            fsym: string; //Comma separated cryptocurrency symbols list [ Min length - 1] [ Max length - 1000]
            tsym: string; // Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 100]
            e: string; //The exchange to obtain data from (our aggregated average - CCCAGG - by default) [ Min length - 2] [ Max length - 150]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/generateAvg`;
            caching: 10; 
            params: RequestParameters;
        }
        
        export interface Response{
            RAW: { //Full price data
                [fysm: string]: { 
                    [tsym: string]: PriceData; 
                }; 
            };
            DISPLAY: { //String conversion of the RAW data
                [fysm: string]: { 
                    [tsym: string]: any; 
                }; 
            }
        }
    }
}
