import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofdayComponent } from './jobofday.component';

describe('JobofdayComponent', () => {
  let component: JobofdayComponent;
  let fixture: ComponentFixture<JobofdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobofdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
