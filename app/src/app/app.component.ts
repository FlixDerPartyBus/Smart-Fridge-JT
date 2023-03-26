import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

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
    // todo
    if (event.key === 'Enter') {
      this.getPerson(this.rfid);
      this.rfid = '';
    }
    this.rfid = this.rfid + event.key;
  }

  constructor(
    private readonly restService: RestService,
    private readonly router: Router
  ) {
  }

  private getPerson(rfid: string) {
    this.restService.getPerson(rfid).then(() => {
      this.router.navigate(['marketplace']);
    }).catch((err) => {
      if(err === 'no person found') {
        this.router.navigate(['newPerson']);
      }
    });
  }
}
