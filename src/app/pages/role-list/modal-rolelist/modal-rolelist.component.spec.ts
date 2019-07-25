import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoleListComponent } from './modal-rolelist.component';

describe('ModalComponent', () => {
  let component: ModalRoleListComponent;
  let fixture: ComponentFixture<ModalRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
