import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewemployeeComponent } from './newemployee.component';

describe('NewemployeeComponent', () => {
  let component: NewemployeeComponent;
  let fixture: ComponentFixture<NewemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewemployeeComponent]
    });
    fixture = TestBed.createComponent(NewemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
