import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { items } from '../enums/items';
import { Item } from '../interfaces/item';
import { Person } from '../interfaces/person';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  public shoppingCart: Item[] = [];
  public allItems = items;
  public currentlyLoggedInPerson: Person = {
    name: 'unkown',
    balance: 0,
    rfid: '0'
  }

  constructor(
    public rest: RestService,
    private router: Router
  ) {
    if (!this.rest.currentlyLoggedInPerson) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.currentlyLoggedInPerson = this.rest.currentlyLoggedInPerson!;
  }

  public addItem(item: Item) {
    this.shoppingCart.push(item);
  }

  public buy() {
    this.rest.buyItems(this.shoppingCart)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  public logout() {
    this.rest.currentlyLoggedInPerson = undefined;
    this.router.navigate(['logout']);
  }

  public admin() {
    this.router.navigate(['admin']);
  }
}
