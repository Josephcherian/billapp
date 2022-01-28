import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.css']
})
export class BillGenerateComponent implements OnInit {
  public billDetails:any;
  constructor(private invService:InventoryService) {}

  ngOnInit() {
    this.invService.getBillDetails().subscribe((data) => {
      this.billDetails = data;
      console.log(data);
      
    })
  }

}
