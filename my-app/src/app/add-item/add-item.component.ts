import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public item:any;
  constructor(private router:Router, private invService:InventoryService) {
      this.item = {};
   }

  ngOnInit() {
      this.item.productType = "TTF";
      this.item.productDescription = "";
      this.item.manufacturer = "Appollo";
  }

  onChangeProduct(type:any){
    switch (type) {
      case "Tyre/Tube/Flap":
        this.item.productType = "TTF";
        break;
      case "Tyre":
        this.item.productType = "T";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
      case "Tubeless":
        this.item.productType = "TL";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
      case "Tubeless Radial":
        this.item.productType = "TLR";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
      case "Parts":
        this.item.productType = "P";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
    case "Lubricants":
        this.item.productType = "L";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
    case "Tube":
        this.item.productType = "TU";
        this.item.tyreAmount = null;
        this.item.tubeAmount = null;
        this.item.flapAmount =  null;
        break;
    case "Flap":
          this.item.productType = "FL";
          this.item.tyreAmount = null;
          this.item.tubeAmount = null;
          this.item.flapAmount =  null;
          break;
      default:
        this.item.productType = "TTF";

    } 
  }
  onChangeManufacturer(value) {
    this.item.manufacturer = value;
  }

  cancel(){
    this.item.productType = "TTF";
    this.item.manufacturer = "Appollo";
    this.item.tyreAmount = null;
    this.item.tubeAmount = null;
    this.item.flapAmount =  null;
    this.item.totalAmount = null;
  }

  add() {
    console.log(this.item);
    this.invService.addItem(this.item).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/catalogue');
    });
  }
}
