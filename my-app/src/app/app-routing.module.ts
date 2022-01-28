import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { SearchInventoryComponent } from './components/search-inventory/search-inventory.component';
import { BillManagementComponent } from './components/bill-management/bill-management.component';
import { BillGenerateComponent } from './components/bill-generate/bill-generate.component';
import { TaxComponent } from './components/tax/tax.component';
import { BillViewComponent } from './components/bill-view/bill-view.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'additem', component: AddItemComponent },
  {path: 'viewinventory/:type', component:ViewInventoryComponent},
  {path: 'searchitem',component:SearchInventoryComponent},
  {path:'billing',component:BillViewComponent},
  {path:'billing/history',component:BillGenerateComponent},
  {path:'tax',component:TaxComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
