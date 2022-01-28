import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';


@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {
  public item:any;
  public itemList:any;
  public showItemView:boolean = true;
  public currentItem:any;
  constructor(private route: ActivatedRoute, private router: Router,private invService:InventoryService) {
    
   }

  ngOnInit() {
    let type = this.route.snapshot.paramMap.get('type');

    switch(type) {
      case 'tyre':
        this.item = "Tyres and Accessories";
        break;
      case 'parts':
          this.item = "Parts";
          break;
      case 'lubricants':
            this.item = "Oil and Lubricants";
            break;
      default:
        this.item = "Tyres and Accessories";
    }
    console.log(this.item);
    this.invService.listItem(type).subscribe((data) => {
      this.itemList = data;
      console.log(data);
      
    })

  }

  getImageUrl(productType) {
    if(productType === 'TTF' || productType === 'TLR' || productType === 'TL'  || productType === 'T') {
      return 'assets/tyre.jpg';
    } else if(productType === 'P') {
      return 'assets/parts.png';
    } else if (productType === 'L') {
      return 'assets/oil.jpg';
    }

  }

  viewItem(item) {
    this.showItemView = false;
    this.currentItem = item;

  }

  updateItem() {
    this.invService.updateItem(this.currentItem).subscribe((data) => {
      this.router.navigateByUrl('/catalogue');
      
    })
  }

  deleteItem() {
    this.invService.deleteItem(this.currentItem._id).subscribe((data) => {
      this.router.navigateByUrl('/catalogue');
      
    })  
  }
}

