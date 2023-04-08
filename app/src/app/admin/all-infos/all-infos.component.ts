import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-all-infos',
  templateUrl: './all-infos.component.html',
  styleUrls: ['./all-infos.component.scss']
})
export class AllInfosComponent {
  @Output() closeEvent = new EventEmitter<void>();
  public allPersons: Person[] = [];
  constructor(
    private readonly rest: RestService
  ) {
    this.rest.getAllPersons().then((persons) => this.allPersons = persons)
  }

  public close() {
    this.closeEvent.emit();
  }
}
