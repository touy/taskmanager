import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOrganizationComponent } from './chart-organization.component';

describe('ChartOrganizationComponent', () => {
  let component: ChartOrganizationComponent;
  let fixture: ComponentFixture<ChartOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
