import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillprintService {

  private billInvoice$ = new Subject<number>();

  
  constructor() { }

  printClicked(no: number) {
    this.billInvoice$.next(no);
  }

  getPrintClicked$() {
    return this.billInvoice$.asObservable();
  }

}
