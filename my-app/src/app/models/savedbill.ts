export class SavedBill {
        invoicenum: number;
        date: Date;
        totalBillAmount: number;
        buyerAddress: string;
    
        constructor(data: any) {
            if (data) {
                this.invoicenum = data.invoicenum;
                this.date = data.date;
                this.totalBillAmount = data.totalBillAmount;
                this.buyerAddress = data.buyerAddress;
            }
    
            return this;
        }
    }