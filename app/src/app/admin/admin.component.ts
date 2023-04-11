import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Person } from '../interfaces/person';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @HostListener('window:touchend') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  public allPersons: Person[] = [];
  public showRegisterPerson = false;
  public showRechargeChip = false;
  public showAllInfos = false;

  private userActivity: any;
  private userInactive: Subject<any> = new Subject();

  private setTimeout() {
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 30000);
  }

  constructor(
    private readonly router: Router,
    private readonly rest: RestService
  ) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.logout());

    this.rest.getAllPersons().then((persons: Person[]) => {
      this.allPersons = persons;
    })

  }

  public submitNewPerson(person: Person) {
    this.rest.registerNewPerson(person)
      .then(() => this.close())
  }

  public submitNewBalance(newData: { person: Person, balance: number }) {
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

  public back() {
    this.router.navigate(['marketplace'])
  }

  public close() {
    this.showRegisterPerson = false;
    this.showRechargeChip = false;
    this.showAllInfos = false
  }
}
