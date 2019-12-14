import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLinguisticExpressionComponent } from './search-linguistic-expression.component';

describe('SearchLinguisticExpressionComponent', () => {
  let component: SearchLinguisticExpressionComponent;
  let fixture: ComponentFixture<SearchLinguisticExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLinguisticExpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLinguisticExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
