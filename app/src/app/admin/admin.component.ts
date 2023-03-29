import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../interfaces/person';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public allPersons: Person[] = [];
  public showRegisterPerson = false;
  public showRechargeChip = false;
  public showAllInfos = false;
  public newPerson: Person = {
    name: '',
    rfid: '',
    balance: 0
  };

  constructor(
    private readonly router: Router,
    private readonly rest: RestService
  ) {
    this.rest.getAllPersons().then((persons: Person[]) => {
      this.allPersons = persons;
      console.log(this.allPersons)
    })
    setTimeout(() => {
      this.logout();
    }, 30000);
  }

  public submitNewPerson() {
    this.rest.registerNewPerson(this.newPerson)
    .then(() => this.close())
  }

  public open() {
    this.rest.open();
  }

  public logout() {
    this.rest.currentlyLoggedInPerson = undefined;
    this.router.navigate(['login']);
  }

  public openRegisterPerson() {
    this.showRegisterPerson = true;
  }

  public openRechargeChip() {
    this.showAllInfos = true;
  }

  public openInfos() {
    this.showAllInfos = true;
  }

  public close() {
    this.showAllInfos = false
  }
}
