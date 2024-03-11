import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceUpdateComponent } from './piece-update.component';

describe('PieceUpdateComponent', () => {
  let component: PieceUpdateComponent;
  let fixture: ComponentFixture<PieceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
