import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofdayEditComponent } from './jobofday-edit.component';

describe('JobofdayEditComponent', () => {
  let component: JobofdayEditComponent;
  let fixture: ComponentFixture<JobofdayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobofdayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofdayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
