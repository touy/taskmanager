import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModleMenberComponent } from './modle-menber.component';

describe('ModleMenberComponent', () => {
  let component: ModleMenberComponent;
  let fixture: ComponentFixture<ModleMenberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModleMenberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModleMenberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
