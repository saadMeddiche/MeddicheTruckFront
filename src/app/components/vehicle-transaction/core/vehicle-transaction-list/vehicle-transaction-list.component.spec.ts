import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTransactionListComponent } from './vehicle-transaction-list.component';

describe('VehicleTransactionListComponent', () => {
  let component: VehicleTransactionListComponent;
  let fixture: ComponentFixture<VehicleTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleTransactionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
