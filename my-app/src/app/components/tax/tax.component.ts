import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  public taxRates:any;

  constructor(private invService:InventoryService) {}

  ngOnInit(){
    this.invService.getTaxRates().subscribe((data) => {
      this.taxRates = data;
      console.log(data);
      
    })
  }

}


