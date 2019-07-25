import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocaddComponent } from './docadd.component';

describe('DocaddComponent', () => {
  let component: DocaddComponent;
  let fixture: ComponentFixture<DocaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
