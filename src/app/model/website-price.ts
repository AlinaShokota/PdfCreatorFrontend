import { PriceRow } from './price-row';

export class WebsitePrice {
    id: number;
    current: Date;
    companyName: string;
    customerCompanyName: string;
    cost: number;
    pricingRows:PriceRow[] = new Array();

    constructor(){
        this.pricingRows =  new Array();
    }
}
