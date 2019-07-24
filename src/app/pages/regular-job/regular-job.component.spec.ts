import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularJobComponent } from './regular-job.component';

describe('RegularJobComponent', () => {
  let component: RegularJobComponent;
  let fixture: ComponentFixture<RegularJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
