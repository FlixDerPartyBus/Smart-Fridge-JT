import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public currentlyLoggedInPerson: Person | undefined;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getPerson(rfid: string): Promise<Person> {
    return new Promise((resolve, reject) => {
      this.http.get<Person>('http://localhost:3000/getPerson?rfid=' + rfid).toPromise()
        .then((person) => {
          console.log(person)
          if (!!person) {
            resolve(person);
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

  public createPerson() {

  }

  public buyItems(items: Item[]): Promise<boolean> {
    console.log(items);
    this.http.post('http://localhost:3000/buy', items).subscribe();
    return Promise.resolve(true);
  }
}
