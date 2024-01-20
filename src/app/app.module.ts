import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardValidatorComponent } from './components/credit-card-validator/credit-card-validator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CreditcardService } from './services/creditcard.service';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardValidatorComponent,

    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CreditcardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
