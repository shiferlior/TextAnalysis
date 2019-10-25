import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPhraseByLocationComponent } from './find-phrase-by-location.component';

describe('FindPhraseByLocationComponent', () => {
  let component: FindPhraseByLocationComponent;
  let fixture: ComponentFixture<FindPhraseByLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPhraseByLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPhraseByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
