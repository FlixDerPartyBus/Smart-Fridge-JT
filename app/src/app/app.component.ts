import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let rfid;
    rfid = rfid + event.key;
    if (event.key === 'Enter') {
      this.sendRequest(rfid);
      console.log(rfid)
      rfid = '';
    }
  }

  constructor(
    public readonly http: HttpClient,
  ) {
    console.log('jo')
  }

  private sendRequest(rfid: string) {
    this.http.get('http://localhost:3000/getPerson?rfid=' + rfid).pipe(
    ).subscribe(val => {
      console.log(val);
    });
  }
}
