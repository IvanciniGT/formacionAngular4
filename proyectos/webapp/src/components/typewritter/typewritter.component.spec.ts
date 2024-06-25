import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewritterComponent } from './typewritter.component';

describe('TypewritterComponent', () => {
  let component: TypewritterComponent;
  let fixture: ComponentFixture<TypewritterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypewritterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypewritterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
