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

}
