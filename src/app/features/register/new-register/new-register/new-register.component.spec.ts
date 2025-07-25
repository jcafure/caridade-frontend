import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterComponent } from './new-register.component';

describe('NewRegisterComponent', () => {
  let component: NewRegisterComponent;
  let fixture: ComponentFixture<NewRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
