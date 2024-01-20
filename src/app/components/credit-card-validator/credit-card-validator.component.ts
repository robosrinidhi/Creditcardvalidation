import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditcardService } from 'src/app/services/creditcard.service';

@Component({
  selector: 'app-credit-card-validator',
  templateUrl: './credit-card-validator.component.html',
  styleUrls: ['./credit-card-validator.component.scss']
})
export class CreditCardValidatorComponent {
  //@ts-ignore
  creditCardDetail : FormGroup;
  constructor(
    private route:Router,
    public creditCardService: CreditcardService
    ){}

    ngOnInit(){
      this.populateYears();
      this.populateMonths();

      this.creditCardDetail = new FormGroup({
        creditCardNumber : new FormGroup({
          cardNumber: new FormControl(''),
          typeOfCard: new FormControl('')
        }),
        creditCardInfo : new FormGroup({
          cardHolderName : new FormControl(''),
          validFrom: new FormGroup({
            validFromMonth: new FormControl(''),
            validFromYear: new FormControl('')
          }),
          validThrough: new FormGroup({
            validThroughMonth: new FormControl(''),
            validThroughYear: new FormControl('')
          }),
          cvv : new FormControl('')
        })
      })
    }

  step:number = 1;
  cardNumber : string = '';
  cardType : string = '';
  isValidCard:boolean = false;
  years: number [] = [];
  months: string[] = [];
  

  cardTypes = [
    {name: 'Visa', pattern: /^4\d{15}$/},
    {name: 'Mastercard', pattern: /^5\d{15}$/},
    {name:'AmericanExpress', pattern: /^3[47]\d{13}$/}
  ];

  private populateYears():void {
    const currentYear = new Date().getFullYear();
    for(let i = currentYear; i<= currentYear+10;i++){
      this.years.push(i);
    }
  }
  private populateMonths():void {
    this.months = [
      'January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'
    ];
  }
  identifyCardType():void {
    this.cardNumber = this.creditCardDetail.get('creditCardNumber')?.get('cardNumber')?.value;
    for(const card of this.cardTypes){
      if (this.cardNumber.match(card.pattern)) {
        // this.cardType = card.name;
        this.creditCardDetail.controls['creditCardNumber'].patchValue({'typeOfCard':card.name})
        this.disableOtherCards(card.name);
        this.isValidCard = true;
        return;
      }
    }
    this.cardType = '';
    this.enableAllCards();
  }

  disableOtherCards(selectedCard : string): void {
    this.cardTypes.forEach(card => {
      if(card.name !== selectedCard){
        console.log(card.name.toLowerCase());
        (document.getElementById(card.name.toLowerCase()) as HTMLInputElement).style.opacity = '0.2';
      }
    });
  }

  enableAllCards(){
    this.cardTypes.forEach(card => {
     (document.getElementById(card.name.toLowerCase()) as HTMLInputElement).style.opacity = '1';
    });
  }

  nextStep(){
    this.step = this.step+1;
  }
  previousStep(){
    this.step = this.step-1; 
  }
  submit(){
    this.step = 3;
    this.creditCardService.saveCreditCardDetails(this.creditCardDetail.value);
    this.route.navigate(['thankyou'])
  }
}

