import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductoComponent } from './newproducto.component';

describe('NewproductoComponent', () => {
  let component: NewproductoComponent;
  let fixture: ComponentFixture<NewproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewproductoComponent]
    });
    fixture = TestBed.createComponent(NewproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
