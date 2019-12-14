import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhraseToPhrasesGroupComponent } from './add-phrase-to-phrases-group.component';

describe('AddPhraseToPhrasesGroupComponent', () => {
  let component: AddPhraseToPhrasesGroupComponent;
  let fixture: ComponentFixture<AddPhraseToPhrasesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhraseToPhrasesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhraseToPhrasesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
