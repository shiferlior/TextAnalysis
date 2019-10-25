import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguisticExpressionComponent } from './linguistic-expression.component';

describe('LinguisticExpressionComponent', () => {
  let component: LinguisticExpressionComponent;
  let fixture: ComponentFixture<LinguisticExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinguisticExpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinguisticExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
