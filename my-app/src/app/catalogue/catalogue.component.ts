import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  addItem() {
    this.router.navigateByUrl('/additem');
  }

  viewInventory(){
    this.router.navigateByUrl('/viewinventory');
  }

  searchItem() {
    this.router.navigateByUrl('/searchitem');
  }

  displayTaxRates() {
    this.router.navigateByUrl('/tax');
  }
}
