import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductoComponent } from './editproducto.component';

describe('EditproductoComponent', () => {
  let component: EditproductoComponent;
  let fixture: ComponentFixture<EditproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditproductoComponent]
    });
    fixture = TestBed.createComponent(EditproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
