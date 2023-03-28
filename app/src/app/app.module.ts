import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { LoginComponent } from './login/login.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { CommonModule } from "@angular/common";
import { SuccessfullComponent } from './successfull/successfull.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    LoginComponent,
    NewPersonComponent,
    SuccessfullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
