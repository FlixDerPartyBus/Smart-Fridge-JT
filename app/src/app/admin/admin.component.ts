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

  public submitNewPerson(person: Person) {
    this.rest.registerNewPerson(person)
    .then(() => this.close())
  }

  public submitNewBalance(newData: {person: Person, balance: number}) {
    this.rest.rechargeChip(newData)
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
    this.showRechargeChip = true;
  }

  public openInfos() {
    this.showAllInfos = true;
  }

  public close() {
    this.showRegisterPerson = false;
    this.showRechargeChip = false;
    this.showAllInfos = false
  }
}
