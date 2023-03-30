import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss']
})
export class RegisterPersonComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitNewPersonEvent = new EventEmitter<Person>();

  public newPerson: Person = {
    name: '',
    rfid: '',
    balance: 0
  };

  public isSubmitDisabled() {
    return this.newPerson.name === '' || this.newPerson.rfid === ''
  }

  public close() {
    this.closeEvent.emit();
  }

  public submitNewPerson() {
    this.submitNewPersonEvent.emit(this.newPerson);
  }
}
