import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NewPersonComponent } from './new-person/new-person.component';

const routes: Routes = [  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent
  },
  {
    path: 'newPerson',
    component: NewPersonComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
