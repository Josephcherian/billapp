import { Component, OnInit } from '@angular/core';
import { BillItem } from 'src/app/models/billitem';
import { BillprintService } from 'src/app/services/billprint.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-bill-print',
  templateUrl: './bill-print.component.html',
  styleUrls: ['./bill-print.component.css']
})
export class BillPrintComponent implements OnInit {

  public billNumber: number;
  public billSubscription: any;
  public billDetail: any;
  public billItems: any;

  constructor(private billService:BillprintService,private invService:InventoryService) { }

  ngOnInit(): void {
    console.log("inside ngoninit of billprint");
    this.billSubscription = this.billService.getPrintClicked$().subscribe(data => this.setBillno(data));
  }

  setBillno(num) {
    this.billNumber = num;
    console.log(this.billNumber);
    this.invService.getBill(this.billNumber).subscribe((data) => {
      this.billDetail = data;
      console.log(data);  
    })

    this.invService.getBillItems(this.billNumber).subscribe((data) => {
      this.billItems = data;
      console.log(data);  
    })

    window.print();
  }
  ngOnDestroy() {
    this.billSubscription.unsubscribe();
  }

}
