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
  private rfid = ''
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendRequest(this.rfid);
      this.rfid = '';
    }
    this.rfid = this.rfid + event.key;
  }

  constructor(
    public readonly http: HttpClient,
  ) {
  }

  private sendRequest(rfid: string) {
    this.http.get('http://localhost:3000/getPerson?rfid=' + rfid).pipe(
    ).subscribe(person => {
      console.log(person);
    });
  }
}
