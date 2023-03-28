import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.scss']
})
export class SuccessfullComponent {
  constructor(
    private readonly router: Router,
  ) {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 7000);
  }
}
