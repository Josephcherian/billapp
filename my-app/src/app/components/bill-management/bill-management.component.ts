import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { BillItem } from 'src/app/models/billitem';
import { SavedBill } from 'src/app/models/savedbill';
import { BillprintService } from 'src/app/services/billprint.service';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css']
})
export class BillManagementComponent implements OnInit {
  public itemList:any;
  public selectedItem:any;
  public billitems: any[];
  public taxRates:any;
  public billInvoiceNumber: number = 0;
  public billTotalAmount: any;
  public billDate:Date;
  public buyerAddress: string;
  public IsmodelShow:any;
  
  constructor(private router:Router,private invService:InventoryService, private billService:BillprintService) { }

  ngOnInit() {
    console.log("inside ngoninit")
    this.invService.listAllItem().subscribe((data) => {
      this.itemList = data;
      this.selectedItem =  this.itemList[0];
      this.billitems = [];
      console.log(data);
      
    })
    this.invService.getTaxRates().subscribe((data) => {
      this.taxRates = data;
    })

  }

  openNewBill() {
    this.router.navigateByUrl('/generatebill');
  }

  onChangeProduct(e,index){
   
    let item = this.itemList.filter(x => x.productDescription === e.target.value);
   
    var bilitem  = this.billitems[index];
    bilitem.id = index;
    bilitem.productDescription = item[0].productDescription;
    bilitem.productType = item[0].productType;
    bilitem.rate = item[0].totalAmount;
    let taxitem = this.taxRates.filter(x => x.productType === item[0].productType);
 
    bilitem.cgst = taxitem[0].CGST;
    bilitem.sgst = taxitem[0].SGST;
    bilitem.floodcess = taxitem[0].CESS;
    
  }

  onChangeQuantity(e,index) {
  
    var bilitem  = this.billitems[index];
    bilitem.quantity = Number(e.target.value);

    if(bilitem.taxableAmount > 0) {
      bilitem.cgstAmount = bilitem.quantity * (bilitem.cgst * bilitem.taxableAmount / 100);
      bilitem.sgstAmount = bilitem.quantity * (bilitem.sgst * bilitem.taxableAmount / 100);
      bilitem.floodCessAmount = bilitem.quantity * (bilitem.floodcess * bilitem.taxableAmount / 100);
      bilitem.netAmount = (bilitem.taxableAmount * bilitem.quantity) + bilitem.cgstAmount + bilitem.sgstAmount + bilitem.floodCessAmount;
      bilitem.invoicenum = this.billInvoiceNumber;
      this.billTotalAmount = this.billitems.reduce((accum,item) => accum + item.netAmount, 0);
    }
    console.log(this.billitems);
  }

  onChangeTaxableAmount(e,index) {
    var bilitem  = this.billitems[index];
   
    bilitem.taxableAmount = Number(e.target.value);

    if(bilitem.taxableAmount > 0) {
      bilitem.cgstAmount = bilitem.quantity * (bilitem.cgst * bilitem.taxableAmount / 100);
      bilitem.sgstAmount = bilitem.quantity * (bilitem.sgst * bilitem.taxableAmount / 100);
      bilitem.floodCessAmount = bilitem.quantity * (bilitem.floodcess * bilitem.taxableAmount / 100);
      bilitem.netAmount = (bilitem.taxableAmount * bilitem.quantity) + bilitem.cgstAmount + bilitem.sgstAmount + bilitem.floodCessAmount;
      bilitem.invoicenum = this.billInvoiceNumber;
      this.billTotalAmount = this.billitems.reduce((accum,item) => accum + item.netAmount, 0);
    }
    
    console.log(this.billitems);
  }
  addBillItem() {
    if(this.billInvoiceNumber == 0) {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      this.billInvoiceNumber = year+month+day+Math.floor(Math.random() * 90) + 1 ;
    }
    var billrow = new BillItem(null);
    this.billitems.push(billrow);
  }

  save() {
    if (this.billitems.length > 0) {
      var bill = new SavedBill(null);
      bill.date = this.billDate;
      bill.totalBillAmount = this.billTotalAmount;
      bill.invoicenum = this.billInvoiceNumber;
      bill.buyerAddress = this.buyerAddress;
      console.log(bill);
      this.invService.saveBill(bill).subscribe((data) => {
        console.log(data);
      });

      this.invService.saveBillItems(this.billitems).subscribe((data) => {
        console.log(data);
      });
    }
  }
  close() {
    this.billitems = [];
    this.billTotalAmount = 0;
    this.billInvoiceNumber = 0;
    this.buyerAddress = "";
    this.billDate = null;
  }

 onChangeDate(event) {
    this.billDate = event.target.value;
    console.log(this.billDate);
 }
 
 async print() {
   await this.save();
   this.billService.printClicked(this.billInvoiceNumber);
  
   
 }
  
}
