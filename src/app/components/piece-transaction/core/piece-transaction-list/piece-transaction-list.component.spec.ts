import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceTransactionListComponent } from './piece-transaction-list.component';

describe('PieceTransactionListComponent', () => {
  let component: PieceTransactionListComponent;
  let fixture: ComponentFixture<PieceTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceTransactionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieceTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
