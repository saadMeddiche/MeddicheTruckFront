import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroTourComponent } from './intro-tour.component';

describe('IntroTourComponent', () => {
  let component: IntroTourComponent;
  let fixture: ComponentFixture<IntroTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
