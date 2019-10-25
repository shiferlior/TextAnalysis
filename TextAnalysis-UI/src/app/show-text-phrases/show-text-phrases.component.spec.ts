import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTextPhrasesComponent } from './show-text-phrases.component';

describe('ShowTextPhrasesComponent', () => {
  let component: ShowTextPhrasesComponent;
  let fixture: ComponentFixture<ShowTextPhrasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTextPhrasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTextPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
