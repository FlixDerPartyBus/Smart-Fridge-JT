import { Component } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private readonly test: HttpClient,
  ) {
    console.log('jo')
    test.get('http://localhost:3000/NFC').pipe(
    ).subscribe(val => {
      console.log(val);
    });
  }
}
