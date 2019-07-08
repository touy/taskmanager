import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserRoleComponent } from './modal-user-roles.component';

describe('ModalComponent', () => {
  let component: ModalUserRoleComponent;
  let fixture: ComponentFixture<ModalUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
