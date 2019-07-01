import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPwComponent } from './send-pw.component';

describe('SendPwComponent', () => {
  let component: SendPwComponent;
  let fixture: ComponentFixture<SendPwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
