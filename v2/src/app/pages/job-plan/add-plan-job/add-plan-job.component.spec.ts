import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanJobComponent } from './add-plan-job.component';

describe('AddPlanJobComponent', () => {
  let component: AddPlanJobComponent;
  let fixture: ComponentFixture<AddPlanJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
