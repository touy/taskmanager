import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanJobComponent } from './edit-plan-job.component';

describe('EditPlanJobComponent', () => {
  let component: EditPlanJobComponent;
  let fixture: ComponentFixture<EditPlanJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
