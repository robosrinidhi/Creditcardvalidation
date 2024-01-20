import { Component, Input } from '@angular/core';
import { CreditcardService } from 'src/app/services/creditcard.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  formData: any;

  constructor(
    private creditCardService: CreditcardService
  ){

  }
  ngOnInit(){
    console.log(this.creditCardService.getCreditCardDetails());
    this.formData = this.creditCardService.getCreditCardDetails();
  }
 
}
