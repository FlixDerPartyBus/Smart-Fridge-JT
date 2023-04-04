import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private rfid = ''
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {    
    document.documentElement.requestFullscreen();
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
      console.error(err);
      this.rfid = '';
    });
  }
}
