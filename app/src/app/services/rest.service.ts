import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../interfaces/item';
import { Person } from '../interfaces/person';

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
          console.log(response)
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


  public buyItems(items: Item[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/buy', { items: items, buyer: this.currentlyLoggedInPerson?.rfid }, { responseType: 'text' }).toPromise()
        .then(() => {
          this.router.navigate(['successfull']);
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

  public rechargeChip(newData: {person: Person, balance: number}): Promise<void> {
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
