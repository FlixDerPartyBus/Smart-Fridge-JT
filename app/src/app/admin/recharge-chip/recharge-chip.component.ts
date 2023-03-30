import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-recharge-chip',
  templateUrl: './recharge-chip.component.html',
  styleUrls: ['./recharge-chip.component.scss']
})
export class RechargeChipComponent {
  @Output() submitBalanceEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter<void>();

  public rfid = '';
  public person: Person | undefined;
  public newBalance: number | undefined;

  constructor(
    private readonly rest: RestService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {

  }

  public inputEvent() {
    this.rest.getPerson(this.rfid).then((person: Person) => {
      this.person = person;
      this.changeDetectorRef.detectChanges();
    });
  }

  public submitNewBalance() {
    this.submitBalanceEvent.emit({ person: this.person, balance: this.newBalance });
    this.close();
  }

  public close() {
    this.closeEvent.emit();
  }
}
