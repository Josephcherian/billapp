
export class Product {
    id: string;
    productDescription: string;
    productType: string;
    manufacturer: string;
    quantity: number;
    tyreAmount?: number;
    tubeAmount?: number;
    flapAmount?: number;
    totalAmount?: number;
    

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.productDescription = data.productDescription;
            this.productType = data.productType;
            this.manufacturer = data.manufacturer;
            this.quantity =  data.quantity;
            this.tyreAmount =  data.tyreAmount;
            this.tubeAmount = data.tubeAmount;
            this.flapAmount = data.flapAmount;
            this.totalAmount = data.totalAmount;
        }

        return this;
    }
}