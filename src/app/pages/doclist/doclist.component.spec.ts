import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoclistComponent } from './doclist.component';

describe('DoclistComponent', () => {
  let component: DoclistComponent;
  let fixture: ComponentFixture<DoclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
