import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeChipComponent } from './recharge-chip.component';

describe('RechargeChipComponent', () => {
  let component: RechargeChipComponent;
  let fixture: ComponentFixture<RechargeChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
