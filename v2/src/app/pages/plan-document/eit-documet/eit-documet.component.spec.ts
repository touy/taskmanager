import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EitDocumetComponent } from './eit-documet.component';

describe('EitDocumetComponent', () => {
  let component: EitDocumetComponent;
  let fixture: ComponentFixture<EitDocumetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EitDocumetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EitDocumetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
