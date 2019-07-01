import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofdayAddComponent } from './jobofday-add.component';

describe('JobofdayAddComponent', () => {
  let component: JobofdayAddComponent;
  let fixture: ComponentFixture<JobofdayAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobofdayAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofdayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
