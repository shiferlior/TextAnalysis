import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContextPhraseComponent } from './show-context-phrase.component';

describe('ShowContextPhraseComponent', () => {
  let component: ShowContextPhraseComponent;
  let fixture: ComponentFixture<ShowContextPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContextPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContextPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
