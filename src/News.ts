import { 
    APIRequest, 
    GlobalParameters, 
    baseURL,
    NewsArticle,
} from './types';

/**
 * Extra, extra! Read all about it!
 */
export namespace News{
    /**
     * Parameters used by every request in the Price API group
     */
    export interface BaseParameters{
        e?: string; // The exchange to obtain data from (our aggregated average - CCCAGG - by default) [ Min length - 2] [ Max length - 30] [ Default - CCCAGG]
    }

    export interface BaseResponse{

    }
    /**
     *  Latest News Articles

     * Get the current price of any cryptocurrency in any other currency that you need.
     * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. If the opposite pair trades we invert it (eg.: BTC-XMR)
     */
    export namespace LatestNewsArticles{
        
        export interface RequestParameters extends GlobalParameters, BaseParameters{
            tryConversion?: string; //Specific news feeds to retrieve news from [ Min length - 1] [ Max length - 1000] [ Default - ALL_NEWS_FEEDS]
            categories?: string; //Category of news articles to return [ Min length - 3] [ Max length - 1000] [ Default - ALL_NEWS_CATEGORIES]
            excludeCategories?: string; //News article categories to exclude from results [ Min length - 3] [ Max length - 1000] [ Default - NO_EXCLUDED_NEWS_CATEGORIES]
            ITs?: number; //Returns news before that timestamp [ Min - 0] [ Default - 0]
            lang?: 'EN' | 'PT'; //Preferred language - English (EN) or Portuguese (PT) [ Min length - 1] [ Max length - 4] [ Default - EN]
            sortOrder: 'latest' | 'popular';//The order to return news articles - latest or popular [ Min length - 1] [ Max length - 8] [ Default - latest]
        }

        export class Request implements APIRequest{
            constructor(params: RequestParameters){
                this.params = params;
            }
            url: string =  `${baseURL}/v2/news`;
            caching: 120;
            params: RequestParameters;
        }
        
        export interface Response{
            Type: number;
            Message: string;
            Promoted: any[];
            Data: NewsArticle[];
            RateLimit: any;
            HasWarning: boolean;
        }
    }
}
