import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { SuccessfullComponent } from './successfull/successfull.component';

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
    path: 'successfull',
    component: SuccessfullComponent
  },
  {
    path: 'admin',
    component: AdminComponent
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
