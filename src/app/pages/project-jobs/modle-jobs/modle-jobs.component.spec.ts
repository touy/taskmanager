import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModleJobsComponent } from './modle-jobs.component';

describe('ModleJobsComponent', () => {
  let component: ModleJobsComponent;
  let fixture: ComponentFixture<ModleJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModleJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModleJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
