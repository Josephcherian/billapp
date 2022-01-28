export class BillItem {
        invoicenum;number;
        id: number;
        productDescription: string;
        productType: string;
        quantity?: number;
        rate?: number;
        taxableAmount?: number;
        sgst?: number;
        sgstAmount?:number;
        cgst?: number;
        cgstAmount?:number;
        floodcess?:number;
        floodCessAmount?:number;
        netAmount?:number;
        
        
    
        constructor(data: any) {
            if (data) {
                this.invoicenum = data.invoicenum;
                this.id = data.id;
                this.productDescription = data.productDescription;
                this.productType = data.productType;
                this.quantity = data.quantity;
                this.rate = data.rate;
                this.taxableAmount =  data.taxableAmount;
                this.sgst = data.sgst;
                this.sgstAmount = data.sgstAmount;
                this.cgst =  data.cgst;
                this.cgstAmount =  data.cgstAmount;
                this.floodcess = data.floodcess;
                this.floodCessAmount = data.floodCessAmount;
                this.netAmount =  data.netAmount;
            }
    
            return this;
        }
    }