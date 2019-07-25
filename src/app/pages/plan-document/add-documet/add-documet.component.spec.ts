import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumetComponent } from './add-documet.component';

describe('AddDocumetComponent', () => {
  let component: AddDocumetComponent;
  let fixture: ComponentFixture<AddDocumetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
