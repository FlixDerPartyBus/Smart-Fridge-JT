import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from "@angular/common";
import { SuccessfullComponent } from './successfull/successfull.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { AllInfosComponent } from './admin/all-infos/all-infos.component';
import { RechargeChipComponent } from './admin/recharge-chip/recharge-chip.component';
import { RegisterPersonComponent } from './admin/register-person/register-person.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    LoginComponent,
    SuccessfullComponent,
    AdminComponent,
    AllInfosComponent,
    RechargeChipComponent,
    RegisterPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
