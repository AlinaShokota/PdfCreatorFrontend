import { PriceRow } from './price-row';

export class WebsitePriceDocument {
    id: number;
    current: Date;
    companyName: string;
    customerCompanyName: string;
    cost: number;
    pricingRows: PriceRow[] = new Array();

    constructor(){
        this.pricingRows =  new Array();
    }

}
