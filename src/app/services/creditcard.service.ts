import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
  private creditCardData:any;

  constructor() { }

  saveCreditCardDetails(data:any){
    this.creditCardData = data;
  }

  getCreditCardDetails(){
    return this.creditCardData;
  }
}
