import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalDataComponent } from './statistical-data.component';

describe('StatisticalDataComponent', () => {
  let component: StatisticalDataComponent;
  let fixture: ComponentFixture<StatisticalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
