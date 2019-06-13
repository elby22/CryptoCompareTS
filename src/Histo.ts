import { 
    APIRequest, 
    GlobalParameters, 
    baseURL,
    OHLCV
} from './types';

/**
 * Simple endpoints for getting price data for a coin
 */
export namespace Histo{
    /**
     * Parameters used by every request in the Price API group
     */
    export interface BaseParameters{
        e?: string; // The exchange to obtain data from (our aggregated average - CCCAGG - by default) [ Min length - 2] [ Max length - 30] [ Default - CCCAGG]
        tryConversion?: boolean; //If set to false, it will try to get only direct trading values [ Default - true]
        fsym: string; //The cryptocurrency symbol of interest [ Min length - 1] [ Max length - 10]
        tsym: string; //The currency symbol to convert into [ Min length - 1] [ Max length - 10]
        aggregate?: number; //Time period to aggregate the data over (for daily it's days, for hourly it's hours and for minute histo it's minutes) [ Min - 1] [ Max - 30] [ Default - 1]
        aggregatePredictableTimePeriods?: boolean; //True by default, only used when the aggregate param is also in use. If false it will aggregate based on the current time.If the param is false and the time you make the call is 1pm - 2pm, with aggregate 2, it will create the time slots: ... 9am, 11am, 1pm.If the param is false and the time you make the call is 2pm - 3pm, with aggregate 2, it will create the time slots: ... 10am, 12am, 2pm.If the param is true (default) and the time you make the call is 1pm - 2pm, with aggregate 2, it will create the time slots: ... 8am, 10am, 12pm.If the param is true (default) and the time you make the call is 2pm - 3pm, with aggregate 2, it will create the time slots: ... 10am, 12am, 2pm. [ Default - true]
        limit?: number; //The number of data points to return [ Min - 1] [ Max - 2000] [ Default - 30]
        toTs?: string; //Returns historical data before that timestamp. If you want to get all the available historical data, you can use limit=2000 and keep going back in time using the toTs param. You can then keep requesting batches using: &limit=2000&toTs={the earliest timestamp received}
    }

    export interface BaseResponse{
        Response: string;
        Type: number;
        Aggregated: boolean;
        Data: OHLCV[];
        TimeTo: number;
        TimeFrom: number;
        FirstValueInArray: boolean;
        ConversionType: {
            type: string;
            conversionSymbol: string;
        }
        RateLimit: any;
        HasWarning: boolean;
    }
    /**
     * Historical Daily OHLCV
     * Get open, high, low, close, volumefrom and volumeto from the daily historical data.The values are based on 00:00 GMT time. It uses BTC conversion if data is not available because the coin is not trading in the specified currency. If you want to get all the available historical data, you can use limit=2000 and keep going back in time using the toTs param. You can then keep requesting batches using: &limit=2000&toTs={the earliest timestamp received}.
     */
    export namespace HistoricalDailyOHLCV{
        
        export interface RequestParameters extends GlobalParameters, BaseParameters{
            allData?: boolean; //Returns all data (only available on histo day) [ Default - false]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/histoday`;
            caching: 610;
            params: RequestParameters;
        }
        
        export interface Response extends BaseResponse{}
    }

    /**
     * Historical Hourly OHLCV
     * Get open, high, low, close, volumefrom and volumeto from the hourly historical data. It uses BTC conversion if data is not available because the coin is not trading in the specified currency. If you want to get all the available historical data, you can use limit=2000 and keep going back in time using the toTs param. You can then keep requesting batches using: &limit=2000&toTs={the earliest timestamp received}.
     */
    export namespace HistoricalHourlyOHLCV{
        
        export interface RequestParameters extends GlobalParameters, BaseParameters{}

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/histohour`;
            caching: 610;
            params: RequestParameters;
        }
        
        export interface Response extends BaseResponse{}

    }

    /**
     * Historical Hourly OHLCV
     * Get open, high, low, close, volumefrom and volumeto from the hourly historical data. It uses BTC conversion if data is not available because the coin is not trading in the specified currency. If you want to get all the available historical data, you can use limit=2000 and keep going back in time using the toTs param. You can then keep requesting batches using: &limit=2000&toTs={the earliest timestamp received}.
     */
    export namespace HistoricalMinuteOHLCV{
        
        export interface RequestParameters extends GlobalParameters, BaseParameters{}

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/histominute`;
            caching: 40;
            params: RequestParameters;
        }
        
        export interface Response extends BaseResponse{}

    }

    //Not currently using the other ones
}
