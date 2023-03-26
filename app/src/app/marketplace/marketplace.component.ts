import { Component } from '@angular/core';
import { items } from '../enums/items';
import { Item } from '../interfaces/item';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent {
  public shoppingCart: Item[] = [];
  public allItems = items;
  constructor(
    private rest: RestService
  ) {
  }

  public addItem(item: Item) {
    this.shoppingCart.push(item);
  }

  public buy() {
    this.rest.buyItems(this.shoppingCart);
  }
}
