import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularJobCompleComponent } from './regular-job-comple.component';

describe('RegularJobCompleComponent', () => {
  let component: RegularJobCompleComponent;
  let fixture: ComponentFixture<RegularJobCompleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularJobCompleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularJobCompleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
