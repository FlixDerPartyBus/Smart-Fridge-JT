import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.scss']
})
export class SuccessfullComponent {
  public name = '';
  public newBalance = '';
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if(params && params['person'] ) {
        this.name = JSON.parse(params['person']).name;
        this.newBalance = JSON.parse(params['person']).balance;
      }
    });
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 7000);
  }
}
