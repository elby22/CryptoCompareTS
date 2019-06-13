export const baseURL = 'https://min-api.cryptocompare.com/data';

/**
 * Parameters used by every endpoint in the API
 */
export interface GlobalParameters{
    extraParams?: string; //The name of your application (we recommend you send it) [ Min length - 1] [ Max length - 2000] [ Default - NotAvailable]
    sign?: string; //If set to true, the server will sign the requests (by default we don't sign them), this is useful for usage in smart contracts [ Default - false]
    'api_key'?: string; //Optional querystring parameter for specifying API key
}

/**
 * Properties possesed by every endpoint in the API
 */
export interface APIRequest{
    url: string; //Base URL of this request
    caching: number; //Length of time in seconds that the server caches the response for
}

export interface PriceData {
    MARKET:                  string;
    FROMSYMBOL:              string;
    TOSYMBOL:                string;
    FLAGS:                   string;
    PRICE:                   number;
    LASTUPDATE:              number;
    LASTVOLUME:              number;
    LASTVOLUMETO:            number;
    LASTTRADEID:             string;
    VOLUME24HOUR:            number;
    VOLUME24HOURTO:          number;
    OPEN24HOUR:              number;
    HIGH24HOUR:              number;
    LOW24HOUR:               number;
    LASTMARKET:              string;
    TOPTIERVOLUME24HOUR:     number;
    TOPTIERVOLUME24HOURTO:   number;
    CHANGE24HOUR:            number;
    CHANGEPCT24HOUR:         number;
    CHANGEDAY:               number;
    CHANGEPCTDAY:            number;
}

export interface PriceDataFull extends PriceData {
    TYPE?:                   string;
    VOLUMEDAY?:              number;
    OPENDAY?:                number;
    HIGHDAY?:                number;
    LOWDAY?:                 number;
    VOLUMEHOUR?:             number;
    VOLUMEHOURTO?:           number;
    OPENHOUR?:               number;
    HIGHHOUR?:               number;
    LOWHOUR?:                number;
    SUPPLY?:                 number;
    MKTCAP?:                 number;
    TOTALVOLUME24H?:         number;
    TOTALVOLUME24HTO?:       number;
    TOTALTOPTIERVOLUME24H?:  number;
    TOTALTOPTIERVOLUME24HTO?:number;
    IMAGEURL?:               string;
}



export interface OHLCV {
    time: number;
    close: number;
    high: number;
    low: number;
    open: number;
    volumefrom: number;
    volumeto: number;
}

export interface NewsArticle{
    id: string;
    guid: string;
    published_on: number;
    imageurl: string;
    title: string;
    url: string;
    source:  string;
    body: string;
    tags: string;
    categories: string;
    upvotes:  string;
    downvotes:  string;
    lang:  string;
    source_info: NewsSourceInfo;
}

export interface NewsSourceInfo {
    name: string;
    lang: string;
    img: string;
}