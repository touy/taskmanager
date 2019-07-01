import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDaskbordComponent } from './them-daskbord.component';

describe('ThemDaskbordComponent', () => {
  let component: ThemDaskbordComponent;
  let fixture: ComponentFixture<ThemDaskbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemDaskbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemDaskbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
