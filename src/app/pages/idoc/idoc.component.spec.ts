import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdocComponent } from './idoc.component';

describe('IdocComponent', () => {
  let component: IdocComponent;
  let fixture: ComponentFixture<IdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
