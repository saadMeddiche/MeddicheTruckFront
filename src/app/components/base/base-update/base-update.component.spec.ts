import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUpdateComponent } from './base-update.component';

describe('BaseUpdateComponent', () => {
  let component: BaseUpdateComponent;
  let fixture: ComponentFixture<BaseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
