import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserDocComponent } from './modal-user-doc.component';

describe('ModalComponent', () => {
  let component: ModalUserDocComponent;
  let fixture: ComponentFixture<ModalUserDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
