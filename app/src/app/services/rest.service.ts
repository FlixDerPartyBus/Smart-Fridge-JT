import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { Item } from '../interfaces/item';
import { Person } from '../interfaces/person';
import { ShoppingCartItem } from '../interfaces/shoppingCartItem';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public currentlyLoggedInPerson: Person | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  public getPerson(rfid: string): Promise<Person> {
    return new Promise((resolve, reject) => {
      this.http.get<{ person: Person }>('http://localhost:3000/getPerson?rfid=' + rfid).toPromise()
        .then((response) => {
          if (!!response?.person) {
            resolve(response.person);
            this.currentlyLoggedInPerson = response.person;
          } else {
            reject('no person found');
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  public getAllPersons(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Person[]>('http://localhost:3000/getAllPersons').toPromise()
        .then((response) => {
          if (!!response) {
            resolve(response);
          } else {
            reject('no person found');
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  public getInventory(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Item[]>('http://localhost:3000/getInventory').toPromise()
        .then((response) => {
          if (!!response) {
            resolve(response);
          } else {
            reject('no inventory found');
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    })
  }

  public buyItems(items: ShoppingCartItem[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<{ person: Person }>('http://localhost:3000/buy', { items: items, buyer: this.currentlyLoggedInPerson?.rfid }).toPromise()
        .then((personResponse: { person: Person } | undefined) => {
          this.router.navigate(['successfull'], { queryParams: { person: JSON.stringify(personResponse?.person) } });
          this.currentlyLoggedInPerson = undefined;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/open', {}, { responseType: 'text' }).toPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public registerNewPerson(newPerson: Person): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/newPerson', { person: newPerson }, { responseType: 'text' }).toPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public rechargeChip(newData: { person: Person, balance: number }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/rechargeChip', { newPersonData: newData }, { responseType: 'text' }).toPromise()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
