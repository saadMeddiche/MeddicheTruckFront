import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceImageComponent } from './piece-image.component';

describe('PieceImageComponent', () => {
  let component: PieceImageComponent;
  let fixture: ComponentFixture<PieceImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
