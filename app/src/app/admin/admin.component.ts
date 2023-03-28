import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private readonly router: Router,
    private readonly rest: RestService
  ) {
    setTimeout(() => {
      this.logout();
    }, 30000);
  }

  public logout() {
    this.rest.currentlyLoggedInPerson = undefined;
    this.router.navigate(['login']);
  }
}
