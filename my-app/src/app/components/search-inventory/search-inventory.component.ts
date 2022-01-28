import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.css']
})
export class SearchInventoryComponent implements OnInit {
  public searchKey:String;
  public itemList:any;
  public showSearch:boolean;
  @Output() showItem = new EventEmitter<any>();
 

  constructor(private invService:InventoryService, private router:Router) { }

  ngOnInit() {
    this.searchKey=null;
    this.itemList = null;
    this.showSearch = true;
  }

  search() {
    console.log(this.searchKey);
    this.showSearch = false;
    this.invService.searchItem(this.searchKey).subscribe((data) => {
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
    console.log(item);
    //this.showItem.emit(item);
    if(item.productType === 'TTF' || item.productType === 'TLR' || item.productType === 'TL'  || item.productType === 'T') {
      this.router.navigateByUrl('/viewinventory/tyres');
    }
    
  }
}
